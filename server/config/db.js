import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    console.log("connecting to database...");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database is coneccted: ${conn.connection.host}`);
  } catch (error) {
    console.error(`database connection failure: ${error.message}`);
    process.exit(1); // 
  }
};

export default connectDB;
