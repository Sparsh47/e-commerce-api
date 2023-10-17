import express from "express";
import {
  getAllOrder,
  confirmOrders,
  shipOrders,
  deliverOrders,
  cancelOrders,
  deleteOrders,
} from "../controllers/adminOrder.controller.js";
import authenticate from "../middlewares/authenticate.js";

const adminRouter = express.Router();

adminRouter.get("/", authenticate, getAllOrder);
adminRouter.put("/:orderID/confirmed", confirmOrders);
adminRouter.put("/:orderID/ship", shipOrders);
adminRouter.put("/:orderID/deliver", deliverOrders);
adminRouter.put("/:orderID/cancel", cancelOrders);
adminRouter.put("/:orderID/delete", deleteOrders);

export default adminRouter;
