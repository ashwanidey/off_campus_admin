import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id : {
    type : Number,
    required : true,
    unique : true,
  },
  name : {
    type : String,
    required : false,
    default : "",
  },
  label : {
    type : String,
    required : false,
    default : "",
  },
  product_id : {
    type : Number,
    required : true,
    default : 0,
  },
  rating : {
    type : Number,
    required : true,
    default : 0,
  },
  testimonial : {
    type : String,
    required : true,
    default : "",
  },
  type : {
    type : String,
    required : true,
    default : "",
  },
  isApproved : {
    type : Boolean,
    required : false,
    default : false,
  },
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);