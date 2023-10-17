import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  createRatings,
  getAllRatings,
} from "../controllers/rating.controller.js";

const ratingRouter = express.Router();

ratingRouter.put("/product/:productId", authenticate, getAllRatings);
ratingRouter.post("/create", authenticate, createRatings);

export default ratingRouter;
