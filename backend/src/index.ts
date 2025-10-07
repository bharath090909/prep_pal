import type { Express } from "express";
import express from "express";
import authRouter from "./routes/auth.route.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app: Express = express();
app.use(cors(corsOptions));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;
app.use(express.json());

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
