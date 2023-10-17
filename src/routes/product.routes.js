import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  findProduct,
  findAllProducts,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", authenticate, findAllProducts);
productRouter.get("/:id/:id", authenticate, findProduct);

export default productRouter;
