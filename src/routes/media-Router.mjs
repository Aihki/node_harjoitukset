import express from "express";
import multer from "multer";
import {
  fullListOfMedia,
  mediaByItsId,
  newMedia,
  putMedia,
  removeMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

//routes for /api/media
mediaRouter
  .route("/")
  .get(fullListOfMedia)
  .post(upload.single("file"), newMedia);

///router specific logger
//mediaRouter.use(logger);

//routes for /api/media/:id
mediaRouter.route("/:id").get(mediaByItsId).put(putMedia).delete(removeMedia);

export default mediaRouter;
