import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  password : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    default: "",
  },
  company: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    default: "",
  },
  stats: {
    type: Array,
    default: [],
  },
  booked_dates : [
    {
      timestamp : { type: Date, required: true },
      user_id : { type: Number, required  : true },
      email : { type: String, required : true },
      friend_email : { type: String, default : "" },
      session_id : { type: Number, required : false },
      item_id : { type: Number, required : false },
      testimonial_sent  : { type: String, default : 'false' },
    }
  ],
  added_slots : [
    {
      timings : { type: Array, required : true },
      date : { type: String, required : true },
    }
  ],
  blocked_dates : { type: Array, default: [] },
  timings : [
    {
      days: { type: Array, required: true },
      timing: { type: String, required: true },
    },
  ],
});

export const Expert = mongoose.model('Expert', expertSchema);