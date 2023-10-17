import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  createReviews,
  getAllReviews,
} from "../controllers/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", authenticate, createReviews);
reviewRouter.get("/product/:productId", authenticate, getAllReviews);

export default reviewRouter;
