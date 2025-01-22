import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  sales: { type: Number, default: 0 },
  image: { type: String, default: "" },
  description : { type: String, default: "" },
  function: { type: String, default: "" },
  sub_function: { type: String, default: "" },
  price: { type: Number, required: true },
  discounted_price: { type: Number, required: true },
  type: { type: String, required: true },
  number_of_lectures: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  tags: [
    {
      name: { type: String, required: true },
      color: { type: String, required: true },
    }
  ],
  author : { type: String, required: true },
  author_image : { type: String, default : "" },
  language: { type: String, required: true },
  main_features: [{ type: String }],
  sub_features: [{ type: String }],
  module_description: { type: String, default: "" },
  modules: [
    {
      module_id: { type: Number, required: true },
      module_name: { type: String, required: true },
      module_description: [{ type: String, required: true }],
    }
  ],
  resources : { type: Array, default: [] },
  course_data: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      duration: { type: String, required: true },
      videourl: { type: String, required: true },
      gumletid: { type: String, required: true },
      resource: { type: String, required: false },
    }
  ]
});

export const Course = mongoose.model("Course", CourseSchema);