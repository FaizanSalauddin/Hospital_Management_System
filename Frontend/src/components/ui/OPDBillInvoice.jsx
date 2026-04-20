const OPDBillInvoice = ({ bill, patient, hospitalName = "The Clinical Curative" }) => {
  if (!bill) return null;

  const services = bill.services || [];

  return (
    <div className="mt-6 border rounded-lg p-6 bg-white print:mt-0 print:rounded-none print:border-0">
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold">{hospitalName}</h2>
          <p className="text-sm text-slate-600">OPD Bill Invoice</p>
        </div>
        <div className="text-right text-sm text-slate-700">
          <p>
            <span className="font-semibold">Bill ID:</span> {bill._id}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {bill.createdAt ? new Date(bill.createdAt).toLocaleString() : "-"}
          </p>
          <p>
            <span className="font-semibold">Payment:</span> {bill.paymentStatus || "-"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <h3 className="font-semibold mb-2">Patient Information</h3>
          <p className="text-sm">
            <span className="font-medium">Name:</span> {patient?.name || "-"}
          </p>
          <p className="text-sm">
            <span className="font-medium">Phone:</span> {patient?.phone || "-"}
          </p>
          <p className="text-sm">
            <span className="font-medium">UHID:</span> {patient?.uniquePatientId || "-"}
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Billing Summary</h3>
          <p className="text-sm">
            <span className="font-medium">Subtotal:</span> Rs.{" "}
            {Number(bill.subtotal || 0).toFixed(2)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Discount:</span> Rs.{" "}
            {Number(bill.discount || 0).toFixed(2)}
          </p>
          <p className="text-sm font-semibold">
            <span>Final Amount:</span> Rs. {Number(bill.finalAmount || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Service</th>
              <th className="px-3 py-2 text-left">Charge</th>
              <th className="px-3 py-2 text-left">Qty</th>
              <th className="px-3 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item, idx) => (
              <tr key={`${item.serviceName}-${idx}`} className="border-t">
                <td className="px-3 py-2">{item.serviceName}</td>
                <td className="px-3 py-2">Rs. {Number(item.charge || 0).toFixed(2)}</td>
                <td className="px-3 py-2">{item.quantity}</td>
                <td className="px-3 py-2">Rs. {Number(item.total || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OPDBillInvoice;
