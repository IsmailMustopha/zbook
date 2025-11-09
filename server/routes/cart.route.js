import express from "express";
import { addToCart, updateCart } from "../controllers/cart.controller.js";
import authUser from "../middlewares/auth.user.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
