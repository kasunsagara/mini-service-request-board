import express from "express";
import { getJobs, getJobById, createJob, updateJobStatus, deleteJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.get("/", getJobs);
jobRouter.get("/:id", getJobById);
jobRouter.post("/", protect, createJob);
jobRouter.patch("/:id", updateJobStatus);
jobRouter.delete("/:id", protect, deleteJob);

export default jobRouter;