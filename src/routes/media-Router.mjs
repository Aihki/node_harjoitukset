import express from "express";
import {
  deleteMedia,
  getMediaById,
  getMediaItems,
  postMedia,
  updateMedia,
} from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();

mediaRouter
  .route("/api/media")
  .get(getMediaItems)
  .post(postMedia)
  .route("/api/media/:id")
  .get(getMediaById)
  .put(updateMedia)
  .delete(deleteMedia);

export default mediaRouter;
