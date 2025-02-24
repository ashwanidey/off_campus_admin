import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: String,
    required: true
  },
  item_id: {
    type: Number,
    default: null,
  },
  type:{
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  is_course_extension : {
    type: Boolean,
    default: false,
  },
  extended_days : {
    type: Number,
    default : 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  is_gift : {
    type: Boolean,
    default: false,
  },
  
});

export const Transaction = mongoose.model("Transaction", transactionSchema);