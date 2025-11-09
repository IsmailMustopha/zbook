import express from "express";
import {
  allOrders,
  placeOrderCOD,
  placeOrderOnline,
  updateStatus,
  userOrders,
  verifyPayment,
} from "../controllers/order.controller.js";
import authUser from "../middlewares/auth.user.js";
import authAdmin from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

// For Admin
orderRouter.post("/list", authAdmin, allOrders);
orderRouter.post("/status", authAdmin, updateStatus);

// For Payment
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/online", authUser, placeOrderOnline);
orderRouter.post("/verify-payment", authUser, verifyPayment);

// For User
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
