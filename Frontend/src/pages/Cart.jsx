import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart }) => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
                <div className="container mx-auto px-4 py-12 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8"
                    >
                        <span className="text-6xl block mb-4">🛒</span>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
                        <Link to="/store">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                                Continue Shopping →
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
            <div className="container mx-auto px-4 py-8">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-bold text-gray-800 mb-8"
                >
                    🛒 Your Cart ({cart.length} items)
                </motion.h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <AnimatePresence>
                            {cart.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col sm:flex-row gap-4 items-center"
                                >
                                    <img
                                        src={item.image || "https://cdn-icons-png.flaticon.com/512/3096/3096985.png"}
                                        alt={item.name}
                                        className="w-20 h-20 object-contain"
                                        onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/3096/3096985.png"}
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <p className="text-blue-600 font-semibold">₹{item.price}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                                        >
                                            -
                                        </button>
                                        <span className="font-semibold w-8 text-center">{item.quantity || 1}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            disabled={(item.quantity || 1) >= item.quantity}
                                            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        🗑️
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <button
                            onClick={clearCart}
                            className="text-red-500 hover:text-red-700 underline mt-4"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white rounded-xl shadow-md p-6 sticky top-24"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₹{totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Charges</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-800">Total</span>
                                        <span className="font-bold text-xl text-blue-600">₹{totalAmount}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout">
                                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                                    Proceed to Checkout →
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;