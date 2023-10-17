import { createRating, getAllRating } from "../services/rating.service.js";

const createRatings = async (req, res) => {
  const user = req.user;
  try {
    const review = await createRating(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllRatings = async (req, res) => {
  const productId = req.params.productId;
  try {
    const review = await getAllRating(productId);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export { createRatings, getAllRatings };
