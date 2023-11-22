import express from "express";
import { getMe, postlogin } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const authRouter = express.Router();

///routes for /api/users
authRouter.route("/login").post(postlogin);
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
