import Review from "../models/review.model.js";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
} from "./product.service.js";

async function createReview(repData, user) {
  const product = await findProductById(repData.productId);

  const review = new Review({
    user: user._id,
    product: product._id,
    review: repData.review,
    createdAt: new Date(),
  });

  await product.save();

  return await review.save();
}

async function getAllReview(productId) {
  const product = await findProductById(repData.productId);

  return await Review.find({ product: productId }).populate("user");
}

export { createReview, getAllReview };
