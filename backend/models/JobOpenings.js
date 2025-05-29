import mongoose from 'mongoose';

const JobOpeningsSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    company: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const JobOpenings = mongoose.model("JobOpenings", JobOpeningsSchema);