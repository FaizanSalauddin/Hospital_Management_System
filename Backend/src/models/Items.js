import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    supplier: String,
    expiryDate: Date,
    description: String,
    imageUrl: String,
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);