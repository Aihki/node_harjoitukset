import express from "express";
import multer from "multer";
import {
  deleteMedia,
  getMediaById,
  getMediaItems,
  postMedia,
  updateMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

//routes for /api/media
mediaRouter
  .route("/")
  .get(getMediaItems)
  .post(upload.single("file"), postMedia);

///router specific logger
//mediaRouter.use(logger);

//routes for /api/media/:id
mediaRouter
  .route("/:id")
  .get(getMediaById)
  .put(updateMedia)
  .delete(deleteMedia);

export default mediaRouter;
