import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import connectDB from "./utils/db";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Task Manager API 👋",
  });
});
app.use("/api/health", (req, res) => {
  res.json({
    message: "API health is good 👍",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Database connection
connectDB();

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Resource not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
