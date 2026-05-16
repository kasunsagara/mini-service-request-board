import mongoose from "mongoose";

const jobRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    location: {
      type: String,
    },
    contactName: {
      type: String,
    },
    contactEmail: {
      type: String,
      match: /.+\@.+\..+/,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("JobRequest", jobRequestSchema);