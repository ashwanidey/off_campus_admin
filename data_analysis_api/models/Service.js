import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  serviceid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, default: "" },
  icon: { type: String, default: "" },
  description: { type: String, default: "" },
  subfunction: { type: String, default: "" },
  function: { type: String, default: "" },
  price: { type: Number, required: true },
  discounted_price: { type: Number, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: false },
  sales: { type: Number, default: 0 },
  tags: [
    {
      name: { type: String, required: true },
      color: { type: String, required: true },
    },
  ],
  item_link: { type: String, default: "" },
  booked_services : [
    {
      
      user_id : { type: Number, required  : true },
      fileName : { type: String, required : true },
      email : { type: String, required : true },
      service_id : { type: Number, required : false },
      item_id : { type: Number, required : false },
      note : { type: String, required : false },
      phone_number : { type: String, required : false },
    }
  ]
});

export const Service = mongoose.model("Service", ServiceSchema);