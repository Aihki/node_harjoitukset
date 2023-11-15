import express from "express";
import {
  deleteMedia,
  getMediaById,
  getMediaItems,
  postMedia,
  updateMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = express.Router();
//routes for /api/media
mediaRouter.route("/").get(getMediaItems).post(postMedia);

///router specific logger
//mediaRouter.use(logger);

//routes for /api/media/:id
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(updateMedia)
  .delete(deleteMedia);

export default mediaRouter;
