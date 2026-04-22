import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../../models/Items.js";
import { items } from "./items.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Item.deleteMany(); // clear old
    await Item.insertMany(items);

    console.log("✅ Items Seeded");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();