import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

// Routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";
import examRoutes from "./routes/exams";
import attemptRoutes from "./routes/attempts";

dotenv.config();
connectDB();

const app: Application = express();

/* CORS Config */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://spcbt-nine.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/* Preflight requests */
app.options("*", cors());

/* JSON Middleware */
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/attempts", attemptRoutes);

/* Health Check */
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
