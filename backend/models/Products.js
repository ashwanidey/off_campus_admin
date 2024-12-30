import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, default: "" },
  icon: { type: String, default: "" },
  description: { type: String, default: "" },
  subfunction: { type: String, default: "" },
  function: { type: String, default: "" },
  price: { type: Number, required: true },
  discounted_price: { type: Number, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true },
  sales: { type: Number, default: 0 },
  tags: [
    {
      name: { type: String, required: true },
      color: { type: String, required: true },
    },
  ],
  item_link: { type: String, default: "" },
});

export const Product = mongoose.model("Product", ProductSchema);