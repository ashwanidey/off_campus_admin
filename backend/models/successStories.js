import mongoose from "mongoose";

const successStoriesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  company: {
    type: String,
    required: false,
    default: "",
  },
  companyLogo: {
    type: String,
    required: false,
    default: "",
  },
  photo: {
    type: String,
    required: false,
    default: "",
  },
});

export const SuccessStories = mongoose.model(
  "SuccessStories",
  successStoriesSchema
);
