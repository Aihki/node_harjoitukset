import express from "express";
import {
  deleteMedia,
  getMediaById,
  getMediaItems,
  postMedia,
  updateMedia,
} from "../controllers/media-controller.mjs";

const mediaRouter = express.Router();
//routes for /api/media
mediaRouter.route("/").get(getMediaItems).post(postMedia);

//routes for /api/media/:id
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(updateMedia)
  .delete(deleteMedia);

export default mediaRouter;
