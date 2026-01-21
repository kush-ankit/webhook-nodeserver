import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import healthRoutes from "./routes/health.route";
import cashfreeRoutes from "./routes/cashfree.route";
import connectDB from "./config/db";
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/cashfree", cashfreeRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
