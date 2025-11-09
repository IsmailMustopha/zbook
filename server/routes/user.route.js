import express from "express";
import { isAuth, logout, userLogin, userRegister } from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.user.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/logout", logout);
userRouter.get("/is-auth", authUser, isAuth);

export default userRouter;
