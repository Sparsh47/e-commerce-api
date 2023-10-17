import Rating from "../models/rating.model.js";
import { findProductById } from "./product.service.js";

async function createRating(repData, user) {
  const product = await findProductById(repData.productId);

  const rating = new Rating({
    user: user._id,
    product: product._id,
    rating: repData.rating,
    createdAt: new Date(),
  });

  await product.save();

  return await rating.save();
}

async function getAllRating(productId) {
  const product = await findProductById(repData.productId);

  return await Rating.find({ product: productId }).populate("user");
}

export { createRating, getAllRating };
