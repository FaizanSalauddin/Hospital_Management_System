import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "../models/Doctor.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const doctors = [
  { name: "Dr. Amit Sharma", specialization: "Cardiology", availableTime: "10AM-2PM" },
  { name: "Dr. Rajesh Verma", specialization: "Neurology", availableTime: "11AM-3PM" },
  { name: "Dr. Neha Gupta", specialization: "Dermatology", availableTime: "9AM-1PM" },
  { name: "Dr. Priya Singh", specialization: "Gynecology", availableTime: "12PM-4PM" },
  { name: "Dr. Ankit Jain", specialization: "Orthopedics", availableTime: "10AM-1PM" },
  { name: "Dr. Rohit Mehta", specialization: "Cardiology", availableTime: "2PM-6PM" },
  { name: "Dr. Sneha Kapoor", specialization: "Pediatrics", availableTime: "9AM-12PM" },
  { name: "Dr. Vikram Malhotra", specialization: "Oncology", availableTime: "11AM-2PM" },
  { name: "Dr. Kunal Arora", specialization: "ENT", availableTime: "1PM-4PM" },
  { name: "Dr. Pooja Agarwal", specialization: "Psychiatry", availableTime: "10AM-2PM" },

  { name: "Dr. Deepak Yadav", specialization: "Radiology", availableTime: "3PM-6PM" },
  { name: "Dr. Arjun Mishra", specialization: "Cardiology", availableTime: "9AM-12PM" },
  { name: "Dr. Simran Kaur", specialization: "Dermatology", availableTime: "12PM-3PM" },
  { name: "Dr. Rahul Khanna", specialization: "Orthopedics", availableTime: "10AM-2PM" },
  { name: "Dr. Meera Nair", specialization: "Gynecology", availableTime: "11AM-4PM" },
  { name: "Dr. Sandeep Reddy", specialization: "Neurology", availableTime: "2PM-6PM" },
  { name: "Dr. Kavita Iyer", specialization: "Pediatrics", availableTime: "9AM-1PM" },
  { name: "Dr. Nikhil Bansal", specialization: "ENT", availableTime: "1PM-5PM" },
  { name: "Dr. Alok Srivastava", specialization: "Oncology", availableTime: "10AM-3PM" },
  { name: "Dr. Ritu Saxena", specialization: "Psychiatry", availableTime: "11AM-2PM" },

  { name: "Dr. Harsh Vardhan", specialization: "Cardiology", availableTime: "2PM-6PM" },
  { name: "Dr. Mohit Chawla", specialization: "Orthopedics", availableTime: "9AM-12PM" },
  { name: "Dr. Tania Roy", specialization: "Dermatology", availableTime: "1PM-4PM" },
  { name: "Dr. Ashish Kulkarni", specialization: "Neurology", availableTime: "10AM-2PM" },
  { name: "Dr. Pankaj Tiwari", specialization: "ENT", availableTime: "11AM-3PM" },
  { name: "Dr. Ramesh Pillai", specialization: "Radiology", availableTime: "3PM-6PM" },
  { name: "Dr. Shalini Desai", specialization: "Gynecology", availableTime: "9AM-1PM" },
  { name: "Dr. Vivek Chauhan", specialization: "Oncology", availableTime: "12PM-4PM" },
  { name: "Dr. Anjali Bhatt", specialization: "Pediatrics", availableTime: "10AM-2PM" },
  { name: "Dr. Manish Sinha", specialization: "Psychiatry", availableTime: "1PM-5PM" },

  { name: "Dr. Abhishek Das", specialization: "Cardiology", availableTime: "9AM-12PM" },
  { name: "Dr. Rohan Kapoor", specialization: "Orthopedics", availableTime: "2PM-6PM" },
  { name: "Dr. Sonia Mehra", specialization: "Dermatology", availableTime: "11AM-3PM" },
  { name: "Dr. Gaurav Singh", specialization: "Neurology", availableTime: "10AM-2PM" },
  { name: "Dr. Kiran Rao", specialization: "Gynecology", availableTime: "1PM-4PM" },
  { name: "Dr. Dev Patel", specialization: "ENT", availableTime: "9AM-1PM" },
  { name: "Dr. Prakash Menon", specialization: "Radiology", availableTime: "2PM-5PM" },
  { name: "Dr. Ayesha Khan", specialization: "Pediatrics", availableTime: "10AM-3PM" },
  { name: "Dr. Sameer Qureshi", specialization: "Psychiatry", availableTime: "12PM-4PM" },
  { name: "Dr. Nitin Goyal", specialization: "Oncology", availableTime: "11AM-2PM" }
];

const seedDoctors = async () => {
  try {
    await Doctor.insertMany(doctors);
    console.log("✅ Real Doctors Inserted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDoctors();