import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  createOrder,
  findOrder,
  orderHistory,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/", authenticate, createOrder);
orderRouter.get("/:id", authenticate, findOrder);
orderRouter.get("/user", authenticate, orderHistory);

export default orderRouter;
