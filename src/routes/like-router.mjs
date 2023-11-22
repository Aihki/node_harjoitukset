import express from "express";
import {
  deleteLikeById,
  mediaLikes,
  userLikes,
} from "../controllers/like-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const likeRouter = express.Router();

///routes for /api/likes/media/:id
likeRouter.route("/media/:id").get(mediaLikes);
///routes for /api/likes/user/:id
likeRouter.route("/user/:id").get(userLikes);

///delete like by id /api/likes/:id
likeRouter.route("/:id").delete(authenticateToken, deleteLikeById);

export default likeRouter;
