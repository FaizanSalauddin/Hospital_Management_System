import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PurchaseSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Get order details from state or localStorage
        if (location.state?.orderDetails) {
            setOrderDetails(location.state.orderDetails);
            // Clear the stored order after reading
            localStorage.removeItem("lastOrder");
        } else {
            const savedOrder = localStorage.getItem("lastOrder");
            if (savedOrder) {
                setOrderDetails(JSON.parse(savedOrder));
                localStorage.removeItem("lastOrder");
            } else {
                // No order found, redirect to store after 2 seconds
                setTimeout(() => {
                    navigate("/store");
                }, 2000);
            }
        }
    }, [location.state, navigate]);

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Success Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <span className="text-5xl">✅</span>
                        </motion.div>
                        <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
                        <p className="text-green-100 mt-2">Thank you for your purchase</p>
                    </div>

                    {/* Order Details */}
                    <div className="p-6">
                        <div className="border-b pb-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Order ID:</span>
                                <span className="font-mono font-bold">{orderDetails.orderId}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-500">Order Date:</span>
                                <span>{orderDetails.orderDate}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-500">Payment Method:</span>
                                <span className="capitalize font-semibold">
                                    {orderDetails.paymentMethod === "cod" ? "Cash on Delivery" :
                                        orderDetails.paymentMethod === "card" ? "Credit/Debit Card" : "UPI"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-500">Order Status:</span>
                                <span className="text-green-600 font-semibold">{orderDetails.orderStatus}</span>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="border-b pb-4 mb-4">
                            <h3 className="font-bold text-gray-800 mb-2">Delivery Address</h3>
                            <p className="text-gray-600">{orderDetails.customerName}</p>
                            <p className="text-gray-600">{orderDetails.address}</p>
                            <p className="text-gray-600">📞 {orderDetails.phone}</p>
                            <p className="text-gray-600">✉️ {orderDetails.email}</p>
                        </div>

                        {/* Order Items */}
                        <div className="border-b pb-4 mb-4">
                            <h3 className="font-bold text-gray-800 mb-2">Order Items</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {orderDetails.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm py-1">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span className="font-semibold">₹{item.total}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-3 pt-2 border-t font-bold">
                                <span>Total Amount</span>
                                <span className="text-green-600 text-xl">₹{orderDetails.totalAmount}</span>
                            </div>
                        </div>

                        {/* Delivery Message for COD */}
                        {orderDetails.paymentMethod === "cod" && (
                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🚚</span>
                                    <div>
                                        <p className="font-semibold text-blue-800">Cash on Delivery</p>
                                        <p className="text-sm text-blue-600">
                                            Please keep ₹{orderDetails.totalAmount} ready for delivery
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/store" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    🛒 Visit Store Again
                                </motion.button>
                            </Link>
                            <Link to="/" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    🏠 Go to Home
                                </motion.button>
                            </Link>
                        </div>

                        {/* Continue Shopping Button */}
                        <div className="mt-3">
                            <Link to="/store">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                                >
                                    Continue Shopping →
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PurchaseSuccess;