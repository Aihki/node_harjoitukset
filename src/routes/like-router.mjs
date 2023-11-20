import express from "express";
import {
  mediaLikes,
  newLike,
  removeLike,
  userLikes,
} from "../controllers/like-controller.mjs";

const likeRouter = express.Router();

///routes for /api/likes
likeRouter.route("/").post(newLike);

///routes for /api/likes/:id
likeRouter.route("/:id").delete(removeLike);

///routes for /api/likes/media/:id
likeRouter.route("/media/:id").get(mediaLikes);

///routes for /api/likes/user/:id
likeRouter.route("/user/:id").get(userLikes);

export default likeRouter;
