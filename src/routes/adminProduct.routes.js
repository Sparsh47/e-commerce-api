import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  createProducts,
  deleteProducts,
  updateProducts,
  createMultipleProducts,
} from "../controllers/product.controller.js";

const adminProductRouter = express.Router();

adminProductRouter.post("/", authenticate, createProducts);
adminProductRouter.post("/creates", authenticate, createMultipleProducts);
adminProductRouter.delete("/:id", authenticate, deleteProducts);
adminProductRouter.put("/:id", authenticate, updateProducts);

export default adminProductRouter;
