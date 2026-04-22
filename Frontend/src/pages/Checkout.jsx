import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, clearCart }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "cod",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    // Redirect if cart is empty and order not just placed
    useEffect(() => {
        if (cart.length === 0 && !orderPlaced) {
            navigate("/store");
        }
    }, [cart, navigate, orderPlaced]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Create order details
        const orderDetails = {
            orderId: "ORD" + Date.now(),
            orderDate: new Date().toLocaleString(),
            customerName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
            paymentMethod: formData.paymentMethod,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity || 1,
                price: item.price,
                total: (item.price * (item.quantity || 1))
            })),
            subtotal: totalAmount,
            deliveryCharge: 0,
            totalAmount: totalAmount,
            paymentStatus: formData.paymentMethod === "cod" ? "Pending" : "Paid",
            orderStatus: "Confirmed"
        };

        // Save order to localStorage for success page
        localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setOrderPlaced(true);

            // Clear the cart first
            clearCart();

            // Clear cart from localStorage immediately
            localStorage.removeItem("cart");

            // Navigate to success page with order details
            navigate("/purchase-success", {
                state: { orderDetails: orderDetails },
                replace: true // Replace the current entry in history
            });
        }, 1500);
    };

    if (cart.length === 0 && !orderPlaced) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
            <div className="container mx-auto px-4 py-8">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-bold text-gray-800 mb-8"
                >
                    📋 Checkout
                </motion.h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Checkout Form */}
                    <div className="flex-1">
                        <motion.form
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            onSubmit={handleSubmit}
                            className="bg-white rounded-xl shadow-md p-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="9876543210"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Street address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Mumbai"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        required
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="400001"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Payment Method</h3>

                            <div className="space-y-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === "cod"}
                                        onChange={handleChange}
                                        className="mr-3"
                                    />
                                    <div className="flex-1">
                                        <span className="font-semibold">💵 Cash on Delivery</span>
                                        <p className="text-sm text-gray-500">Pay when you receive the order</p>
                                    </div>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Order...
                                    </span>
                                ) : (
                                    "Place Order (Cash on Delivery)"
                                )}
                            </button>
                        </motion.form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white rounded-xl shadow-md p-6 sticky top-24"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

                            <div className="max-h-64 overflow-y-auto mb-4 space-y-2">
                                {cart.map(item => (
                                    <div key={item._id} className="flex justify-between text-sm py-1">
                                        <span>{item.name} x{item.quantity || 1}</span>
                                        <span className="font-semibold">₹{(item.price * (item.quantity || 1))}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-3 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>₹{totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Charges</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-blue-600">₹{totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;