import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // debug

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;