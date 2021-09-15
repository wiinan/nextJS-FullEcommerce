import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    brand: { type: String, require: true },
    rating: { type: String, require: true },
    numReviews: { type: Number, require: true, default: 0 },
    countInStock: { type: Number, require: true, default: 0 },
    description: { type: String, require: true },
  },
  {
    timestamp: true,
  }
);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
