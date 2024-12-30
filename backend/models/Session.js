import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  sessionid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description : { type: String, default: "" },
  blocked_dates : { type: Array, default: [] },
  timings : { type: Array, default: [] },
  discounted_price : { type: Number, required: true },
  booked_dates : [
    {
      timestamp : { type: Date, required: true },
      user_id : { type: Number, required  : true },
      email : { type: String, required : true },
    }
  ],
  item_link : { type: String, default: "" },
  rating : { type: Number, default: "" },
});


export const Session = mongoose.model("Session", SessionSchema);