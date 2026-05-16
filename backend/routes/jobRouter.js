import express from "express";
import { getJobs, getJobById, createJob, updateJobStatus, deleteJob } from "../controllers/jobController.js";

const jobRouter = express.Router();

jobRouter.get("/", getJobs);
jobRouter.get("/:id", getJobById);
jobRouter.post("/", createJob);
jobRouter.patch("/:id", updateJobStatus);
jobRouter.delete("/:id", deleteJob);

export default jobRouter;