import mongoose from "mongoose";


const CohortSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    default : "",
  },
  author : {
    type: String,
    default : "",
  },
  author_image : {
    type: String,
    default : "",
  },
  participants : [
    {name : { type: String, required: true },
    email : { type: String, required: true },
    purchased_date : { type: Date, required: true },
    phone_number : { type: String, required: true },
    order_id : { type: String, required: true },
    }
  ],
  participants_count : {
    type: Number,
    default : 0,
  },
  discounted_price : {
    type: Number,
    default : 0,
  },
  price_list : {
    type: Array,
    default : [],
  },
  distribution_count : {
    type: Number,
    default : 0,
  },
  participants_limit : {
    type: Number,
    default : 0,
  },
  description : {
    type: String,
    default : "",
  },
  resources_link : [
    {
      title : { type: String, required: true },
      link : { type: String, required: true },
    },
  ],
  date : {
    type: Date,
    required : false,
  },
  isActive : {
    type: Boolean,
    default : true,
  },
  duration : {
    type: Number,
    default : "",
  },
});


export const Cohort = mongoose.model("Cohort", CohortSchema);