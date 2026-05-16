import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import jobRouter from "./routes/jobRouter.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});