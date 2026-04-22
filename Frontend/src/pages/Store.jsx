import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

// Medical product images
const getProductImage = (name, category) => {
    if (category === "Medicine") {
        return "https://cdn-icons-png.flaticon.com/512/3096/3096985.png";
    }
    if (category === "Equipment") {
        if (name === "Thermometer") {
            return "https://cdn-icons-png.flaticon.com/512/2922/2922563.png";
        }
        if (name === "Stethoscope") {
            return "https://cdn-icons-png.flaticon.com/512/4306/4306673.png";
        }
        if (name === "Wheelchair") {
            return "https://cdn-icons-png.flaticon.com/512/2972/2972445.png";
        }
        if (name === "Oxygen Cylinder") {
            return "https://cdn-icons-png.flaticon.com/512/3096/3096985.png";
        }
        return "https://cdn-icons-png.flaticon.com/512/3096/3096974.png";
    }
    if (category === "Consumable") {
        return "https://cdn-icons-png.flaticon.com/512/3096/3096973.png";
    }
    return "https://cdn-icons-png.flaticon.com/512/3096/3096985.png";
};

// Category colors
const categoryColors = {
    Medicine: "bg-emerald-100 text-emerald-800",
    Equipment: "bg-purple-100 text-purple-800",
    Consumable: "bg-amber-100 text-amber-800",
};

const Store = ({ addToCart, cart }) => {  // ← Receive addToCart and cart as props
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        API.get("/store")
            .then(res => {
                setItems(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const showNotification = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleAddToCart = (item) => {
        if (item.quantity === 0) {
            showNotification(`❌ ${item.name} is out of stock!`);
            return;
        }
        addToCart(item);  // ← Use the addToCart from props
        showNotification(`✅ ${item.name} added to cart!`);
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const categories = ["all", ...new Set(items.map(item => item.category))];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const getStockStatus = (quantity) => {
        if (quantity > 50) return { text: "In Stock", textColor: "text-green-600 bg-green-50" };
        if (quantity > 10) return { text: "Limited", textColor: "text-yellow-600 bg-yellow-50" };
        return { text: "Low Stock", textColor: "text-red-600 bg-red-50" };
    };

    const totalAmount = (cart || []).reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const cartCount = (cart || []).length;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 overflow-x-hidden">
            {/* Hide scrollbar */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        className="fixed top-24 right-4 z-50 bg-emerald-500 text-white px-5 py-3 rounded-xl shadow-lg font-medium"
                    >
                        {toastMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-10 shadow-lg">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl md:text-4xl font-bold text-center"
                    >
                        🏥 Clinical Store
                    </motion.h1>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mt-2 text-blue-100 text-sm"
                    >
                        Quality medical supplies & equipment
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 mb-6 border border-gray-100"
                >
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                                🔍
                            </span>
                            <input
                                type="text"
                                placeholder="Search products by name or supplier..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {categories.map(category => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full capitalize whitespace-nowrap transition-all text-sm font-medium ${selectedCategory === category
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {category === "all" ? "All Products" : category}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Cart Summary - Clickable */}
                {cartCount > 0 && (
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.01 }}
                        onClick={goToCart}
                        className="bg-white rounded-xl shadow-md p-4 mb-6 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition-all"
                    >
                        <div className="flex justify-between items-center flex-wrap gap-3">
                            <div>
                                <span className="font-semibold text-gray-700">🛒 Cart Items:</span>
                                <span className="text-2xl font-bold text-blue-600 ml-2">{cartCount}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Total Amount:</span>
                                <span className="text-2xl font-bold text-emerald-600 ml-2">
                                    ₹{totalAmount}
                                </span>
                            </div>
                            <div className="text-blue-500 text-sm">
                                Click to view cart →
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Products Grid */}
                {filteredItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-white rounded-2xl"
                    >
                        <p className="text-gray-400 text-lg">No products found</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    >
                        {filteredItems.map((item) => {
                            const stockStatus = getStockStatus(item.quantity);
                            return (
                                <motion.div
                                    key={item._id}
                                    variants={itemVariants}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                                        <img
                                            src={getProductImage(item.name, item.category)}
                                            alt={item.name}
                                            className="w-28 h-28 object-contain"
                                            onError={(e) => {
                                                e.target.src = "https://cdn-icons-png.flaticon.com/512/3096/3096985.png";
                                            }}
                                        />
                                        {/* Stock Badge */}
                                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold ${stockStatus.textColor}`}>
                                            {stockStatus.text}
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-base font-bold text-gray-800 line-clamp-1">{item.name}</h2>
                                            <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${categoryColors[item.category] || "bg-gray-100 text-gray-800"}`}>
                                                {item.category}
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500 mb-2">Supplier: {item.supplier || "N/A"}</p>

                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xl font-bold text-blue-600">₹{item.price}</span>
                                            <span className="text-xs text-gray-500">Stock: {item.quantity}</span>
                                        </div>

                                        {/* Purchase Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAddToCart(item)}
                                            disabled={item.quantity === 0}
                                            className={`w-full py-2 rounded-xl font-semibold transition-all text-sm ${item.quantity > 0
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            {item.quantity > 0 ? "🛒 Add to Cart" : "Out of Stock"}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>

            {/* Floating Cart Button */}
            {cartCount > 0 && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToCart}
                    className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl font-bold z-50 hover:shadow-xl transition-all"
                >
                    🛒
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                </motion.button>
            )}
        </div>
    );
};

export default Store;