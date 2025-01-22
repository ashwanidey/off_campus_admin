import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  sessionid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description : { type: String, default: "" },
  blocked_dates : { type: Array, default: [] },
  timings : [
    {
      days: { type: Array, required: true },
      timing: { type: String, required: true },
    },
  ],
  author_id : { type: Number, required: true },
  discounted_price : { type: Number, required: true },
  min_discounted_price : { type: Number, required: true },
  booked_dates : [
    {
      timestamp : { type: Date, required: true },
      user_id : { type: Number, required  : true },
      email : { type: String, required : true },
      session_id : { type: Number, required : false },
    }
  ],
  decrement_factor : { type: Array, default: [] },
  faqs : { type: Array, default: [] },
  added_slots : [
    {
      timings : { type: Array, required : true },
      date : { type: String, required : true },
    }
  ],
  item_link : { type: String, default: "" },
  rating : { type: Number, default: "" },
  author : { type: String, default: "" },
  reschedule_price : { type: Number, default: "" },
  author_image : { type: String, default: "" },
  
});


export const Session = mongoose.model("Session", SessionSchema);