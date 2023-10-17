import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { findCart, addItemToCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", authenticate, findCart);
cartRouter.put("/add", authenticate, addItemToCart);

export default cartRouter;
