import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("   → Make sure your IP is whitelisted in MongoDB Atlas.");
    process.exit(1);
  }
};