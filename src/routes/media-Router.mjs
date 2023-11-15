import express from "express";
import {
  deleteMedia,
  getMediaById,
  getMediaItems,
  postMedia,
  updateMedia,
} from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();

mediaRouter.route("/").get(getMediaItems).post(postMedia);
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(updateMedia)
  .delete(deleteMedia);

export default mediaRouter;
