import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  profile_picture: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    default: "",
  },
  course_purchased: [
    {
      course_title: { type: String, required: true },
      course_id: { type: Number, required: true },
      expiry_date: { type: Date, required: true },
      purchased_date: { type: Date, default: Date.now() },
      order_id: { type: String, required: true },
      is_whatsapp: { type: Boolean, default: false },
    },
  ],
  session_purchased: [
    {
      session_id: { type: Number, required: true },
      booked_date: { type: Date },
      purchased_date: { type: Date, default: Date.now() },
      order_id: { type: String, required: true },
      status: { type: String, default: "pending" },
      reschedule_for: { type: Number, default: 0 },
      is_reschedule: { type: Boolean, default: false },
      friend_email: { type: String, default: "" },
      is_bring_friend: { type: Boolean, default: false },
    },
  ],
  product_purchased: [
    {
      product_id: { type: Number, required: true },
      purchased_date: { type: Date, default: Date.now() },
      order_id: { type: String, required: true },
    },
  ],
  service_purchased: [
    {
      service_id: { type: Number, required: true },
      purchased_date: { type: Date, default: Date.now() },
      order_id: { type: String, required: true },
      item_id: { type: Number, required: false },
      status: { type: String, default: "pending" },
      filename: { type: String, required: true },
      note: { type: String, required: false },
    },
  ],
  webinar_purchased: [
    {
      webinar_id: { type: Number, required: true },
      purchased_date: { type: Date, default: Date.now() },
      order_id: { type: String, required: true },
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
