import express from "express";
import { getUserProfile, getAll } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", getUserProfile);
userRouter.get("/", getAll);

export default userRouter;
