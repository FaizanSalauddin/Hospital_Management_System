import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import OPDBillInvoice from "../components/ui/OPDBillInvoice";
import { useLocation } from "react-router-dom";

const emptyServiceRow = {
  serviceName: "",
  charge: 0,
  quantity: 1,
  total: 0,
};

const getApiErrorMessage = (err, fallbackMessage) => {
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    fallbackMessage
  );
};

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const OPDBilling = () => {
  const location = useLocation();
  const [patients, setPatients] = useState([]);
  const [servicesMaster, setServicesMaster] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentBill, setCurrentBill] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentAmount, setPaymentAmount] = useState("");

  const [patientId, setPatientId] = useState("");
  const [services, setServices] = useState([{ ...emptyServiceRow }]);
  const [selectedPackageName, setSelectedPackageName] = useState("");

  const normalizeServiceName = (value = "") =>
    value.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingData(true);
        setError("");
        const [patientsRes, servicesRes] = await Promise.all([
          API.get("/patients"),
          API.get("http://localhost:5000/api/services"),
        ]);
        const normalizedServices = Array.isArray(servicesRes.data)
          ? servicesRes.data
          : servicesRes.data?.services || [];

        setPatients(patientsRes.data || []);
        setServicesMaster(normalizedServices);
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load patients/services."));
      } finally {
        setLoadingData(false);
      }
    };

    fetchInitialData();
  }, []);

  // Temporary debug log to verify services reach component.
  useEffect(() => {
    console.log("OPD Billing services:", servicesMaster);
  }, [servicesMaster]);

  useEffect(() => {
    const routePackage = location.state?.selectedPackage;
    const storedPackageRaw = sessionStorage.getItem("selectedHealthPackageForBilling");
    const storedPackage = storedPackageRaw ? JSON.parse(storedPackageRaw) : null;
    const packageData = routePackage || storedPackage;

    if (!packageData || !servicesMaster.length) return;

    const packageServices = (packageData.includedServices || []).map((serviceName) => {
      const normalizedIncoming = normalizeServiceName(serviceName);
      const matched = servicesMaster.find(
        (s) => normalizeServiceName(s.serviceName) === normalizedIncoming
      );
      const resolvedServiceName = matched?.serviceName || serviceName;
      const charge = matched ? Number(matched.charge) : 0;

      return {
        serviceName: resolvedServiceName,
        charge,
        quantity: 1,
        total: charge,
      };
    });

    if (packageServices.length > 0) {
      setServices(packageServices);
      setSelectedPackageName(packageData.packageName || "");
      setSuccess(`Package loaded: ${packageData.packageName}`);
      setError("");
    }

    sessionStorage.removeItem("selectedHealthPackageForBilling");
  }, [location.state, servicesMaster]);

  const subtotal = useMemo(
    () => services.reduce((sum, item) => sum + Number(item.total || 0), 0),
    [services]
  );

  const finalAmount = useMemo(() => subtotal, [subtotal]);

  const billedPatient = useMemo(() => {
    if (!currentBill?.patientId) return null;
    const billPatientId =
      typeof currentBill.patientId === "string"
        ? currentBill.patientId
        : currentBill.patientId?._id;

    return patients.find((p) => p._id === billPatientId) || null;
  }, [currentBill, patients]);

  const updateServiceRow = (index, field, value) => {
    setServices((prev) => {
      const next = [...prev];
      const row = { ...next[index] };

      if (field === "serviceName") {
        row.serviceName = value;
        const selected = servicesMaster.find((s) => s.serviceName === value);
        row.charge = selected ? Number(selected.charge) : 0;
        row.quantity = row.quantity || 1;
        row.total = Number(row.charge) * Number(row.quantity);
      } else if (field === "quantity") {
        const parsedQty = Math.max(1, Number(value) || 1);
        row.quantity = parsedQty;
        row.total = Number(row.charge || 0) * parsedQty;
      }

      next[index] = row;
      return next;
    });
  };

  const addServiceRow = () => {
    setServices((prev) => [...prev, { ...emptyServiceRow }]);
  };

  const removeServiceRow = (index) => {
    setServices((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleGenerateBill = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const normalizedServices = services.filter((s) => s.serviceName);

    if (!patientId) {
      setError("Please select a patient.");
      return;
    }

    if (normalizedServices.length === 0) {
      setError("Please add at least one billable service.");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        patientId,
        services: normalizedServices.map((s) => ({
          serviceName: s.serviceName,
          charge: Number(s.charge),
          quantity: Number(s.quantity),
          total: Number(s.total),
        })),
        subtotal: Number(subtotal),
        discount: 0,
        finalAmount: Number(finalAmount),
        paymentStatus: "Pending",
      };

      const res = await API.post("/opd-billing", payload);
      const createdBill = res.data || {};
      setCurrentBill({
        ...createdBill,
        patientId: createdBill.patientId || patientId,
        services: Array.isArray(createdBill.services) ? createdBill.services : payload.services,
        subtotal:
          typeof createdBill.subtotal === "number"
            ? createdBill.subtotal
            : Number(payload.subtotal),
        discount:
          typeof createdBill.discount === "number" ? createdBill.discount : Number(payload.discount),
        finalAmount:
          typeof createdBill.finalAmount === "number"
            ? createdBill.finalAmount
            : Number(payload.finalAmount),
      });
      setSuccess(`Bill generated successfully. Bill ID: ${res.data?._id || "N/A"}`);
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to generate OPD bill."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!currentBill?._id) return;
    const expectedAmount = Number(currentBill.finalAmount || 0);
    const enteredAmount = Number(paymentAmount || 0);

    if (enteredAmount <= 0) {
      setError("Enter payment amount before confirming payment.");
      return;
    }

    if (enteredAmount !== expectedAmount) {
      setError(`Payment amount must be exactly Rs. ${expectedAmount.toFixed(2)}.`);
      return;
    }

    try {
      setPaying(true);
      setError("");

      if (paymentMethod === "Cash") {
        const res = await API.put(`/opd-billing/${currentBill._id}/pay`, {
          paymentMethod,
          paymentAmount: enteredAmount,
          transactionId: `cash_${Date.now()}`,
        });
        setCurrentBill(res.data);
        setPaymentAmount("");
        setSuccess("Cash payment completed successfully.");
        return;
      }

      const sdkReady = await loadRazorpayScript();
      if (!sdkReady) {
        setError("Unable to load Razorpay checkout. Please try again.");
        return;
      }

      const orderRes = await API.post(`/opd-billing/${currentBill._id}/razorpay-order`, {
        paymentMethod,
      });

      const orderData = orderRes.data;
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The Clinical Curative",
        description: `OPD Bill Payment - ${orderData.billId}`,
        order_id: orderData.orderId,
        prefill: {
          name: orderData.patientName || "Patient",
        },
        notes: {
          billId: orderData.billId,
          patientName: orderData.patientName || "Patient",
          finalAmount: String(orderData.finalAmount || expectedAmount),
        },
        handler: async (response) => {
          try {
            const verifyRes = await API.post(`/opd-billing/${currentBill._id}/razorpay-verify`, {
              ...response,
              paymentMethod,
            });
            setCurrentBill(verifyRes.data);
            setSuccess("Payment successful via Razorpay. Bill marked as paid.");
            setError("");
          } catch (verifyError) {
            setError(
              getApiErrorMessage(
                verifyError,
                "Payment captured but verification failed. Bill remains pending."
              )
            );
          }
        },
        modal: {
          ondismiss: () => {
            setError("Payment was cancelled. Bill remains pending.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to mark bill as paid."));
    } finally {
      setPaying(false);
    }
  };

  const handlePrintBill = () => {
    if (!currentBill) {
      setError("Generate a bill before printing.");
      return;
    }
    window.print();
  };

  return (
    <div className="pt-32 pb-20 bg-blue-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Reception OPD Billing</h1>

          {loadingData ? (
            <p className="text-slate-600">Loading patients and services...</p>
          ) : (
            <form onSubmit={handleGenerateBill} className="space-y-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Select Patient</label>
                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Choose patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.name} {patient.phone ? `(${patient.phone})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold">Billable Services</h2>
                  <button
                    type="button"
                    onClick={addServiceRow}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    + Add Service
                  </button>
                </div>

                {selectedPackageName && (
                  <p className="text-sm text-blue-700 font-medium mb-3">
                    Prefilled from package: {selectedPackageName}
                  </p>
                )}

                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-3 py-3 text-left">Service</th>
                        <th className="px-3 py-3 text-left">Charge</th>
                        <th className="px-3 py-3 text-left">Qty</th>
                        <th className="px-3 py-3 text-left">Total</th>
                        <th className="px-3 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((row, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-3 py-3">
                            <select
                              value={row.serviceName}
                              onChange={(e) =>
                                updateServiceRow(index, "serviceName", e.target.value)
                              }
                              className="w-full border rounded p-2"
                            >
                              <option value="">Select service</option>
                              {servicesMaster.map((service) => (
                                <option key={service._id} value={service.serviceName}>
                                  {service.serviceName}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-3 py-3">{Number(row.charge || 0).toFixed(2)}</td>
                          <td className="px-3 py-3">
                            <input
                              type="number"
                              min="1"
                              value={row.quantity}
                              onChange={(e) =>
                                updateServiceRow(index, "quantity", e.target.value)
                              }
                              className="w-20 border rounded p-2"
                            />
                          </td>
                          <td className="px-3 py-3">{Number(row.total || 0).toFixed(2)}</td>
                          <td className="px-3 py-3">
                            <button
                              type="button"
                              onClick={() => removeServiceRow(index)}
                              className="text-red-600 font-semibold"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600">Subtotal</p>
                  <p className="text-2xl font-bold">Rs. {subtotal.toFixed(2)}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600">Final Amount</p>
                  <p className="text-2xl font-bold text-green-700">
                    Rs. {finalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {error && <p className="text-red-600 font-medium">{error}</p>}
              {success && <p className="text-green-700 font-medium">{success}</p>}

              {currentBill && (
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-bold text-lg mb-2">Latest Generated Bill</h3>
                  <p className="text-sm text-slate-700 mb-1">Bill ID: {currentBill._id}</p>
                  <p className="text-sm text-slate-700 mb-3">
                    Payment Status:{" "}
                    <span
                      className={`font-semibold ${
                        currentBill.paymentStatus === "Paid"
                          ? "text-green-700"
                          : "text-amber-700"
                      }`}
                    >
                      {currentBill.paymentStatus}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={handlePrintBill}
                    className="mb-3 bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    Print Bill
                  </button>

                  {currentBill.paymentStatus !== "Paid" && (
                    <div className="flex flex-col md:flex-row gap-3 md:items-center">
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="p-3 border rounded-lg"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                      </select>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder={`Enter amount (Rs. ${Number(
                          currentBill.finalAmount || 0
                        ).toFixed(2)})`}
                        className="p-3 border rounded-lg"
                      />

                      <button
                        type="button"
                        onClick={handleMarkAsPaid}
                        disabled={paying}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold disabled:opacity-70"
                      >
                        {paying
                          ? "Processing..."
                          : paymentMethod === "Cash"
                            ? "Complete Cash Payment"
                            : "Pay with Razorpay"}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {currentBill && (
                <OPDBillInvoice
                  bill={currentBill}
                  patient={billedPatient}
                  hospitalName="The Clinical Curative"
                />
              )}

              {!currentBill && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-full font-bold text-lg transition disabled:opacity-70"
                >
                  {submitting ? "Generating..." : "Generate Bill"}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OPDBilling;
