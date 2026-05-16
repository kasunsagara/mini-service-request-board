const mongoose = require("mongoose");

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  location: {
    type: String
  },
  contactName: {
    type: String
  },
  contactEmail: {
    type: String,
    match: /.+\@.+\..+/
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("JobRequest", jobRequestSchema);