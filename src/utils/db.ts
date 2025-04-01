import mongoose from "mongoose";

async function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));
}

export default connectDB;
