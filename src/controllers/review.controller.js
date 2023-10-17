import { createReview, getAllReview } from "../services/review.service.js";

const createReviews = async (req, res) => {
  const user = req.user;
  try {
    const review = await createReview(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  const productId = req.params.productId;
  try {
    const review = await getAllReview(productId);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export { createReviews, getAllReviews };
