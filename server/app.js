import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";

dotenv.config();
connectDB();



const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
 