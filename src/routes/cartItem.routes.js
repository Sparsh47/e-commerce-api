import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { updateCart, removeCart } from "../controllers/cartItem.controller.js";

const cartItemRouter = express.Router();

cartItemRouter.put("/:id", authenticate, updateCart);
cartItemRouter.delete("/:id", authenticate, removeCart);

export default cartItemRouter;
