import express from "express";
import {
  fullListOfMedia,
  mediaByItsId,
  newMedia,
  putMedia,
  removeMedia,
} from "../controllers/media-controller.mjs";
import { logger } from "../middlewares/middlewares.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";
import upload from "../middlewares/uploader.mjs";

const mediaRouter = express.Router();

//routes for /api/media
mediaRouter
  .route("/")
  .get(fullListOfMedia)
  .post(
    authenticateToken,
    upload.single("file"),
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ max: 20 }),
    newMedia
  );

///router specific logger
//mediaRouter.use(logger);

//routes for /api/media/:id
mediaRouter
  .route("/:id")
  .get(mediaByItsId)
  .put(
    authenticateToken,
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ max: 20 }),
    body("filename").trim().isLength({ min: 5 }),
    putMedia
  )
  .delete(authenticateToken, removeMedia);

export default mediaRouter;
