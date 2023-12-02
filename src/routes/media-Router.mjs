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

/**
 * @api {get} /api/media Get all media
 * @apiVersion 1.0.0
 * @apiName GetMedia
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiDescription Get all media.
 *
 * @apiSuccess {Object[]} media List of media.
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *   "media": [
 *      {
 *         "media_id": 1,
 *         "user_id": 1,
 *        "filename": "a-beautiful-picture.jpg",
 *        "filesize": 1000,
 *        "media_type": "image/jpeg",
 *        "title": "A beautiful picture",
 *        "description": "A beautiful picture",
 *  "created_at": "2021-08-31T11:27:58.000Z",
 * },
 *
 *
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not Found
 *   {
 *    "error": {
 *     "message": "No media found",
 *    "status": 404
 *  }
 *
 */

/**
 * @api {post} /api/media Create a new media
 * @apiVersion 1.0.0
 * @apiName PostMedia
 * @apiGroup Media
 * @apiPermission token
 *
 * @apiDescription Create a new media.
 *
 * @apiParam {String} title Title of the media.
 * @apiParam {String} description Description of the media.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *    "title": "A beautiful picture",
 *   "description": "A beautiful picture",
 * }
 *
 */

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

/**
 * @api {get} /api/media/:id Request media information
 * @apiVersion 1.0.0
 * @apiName GetMediaById
 * @apiGroup Media
 * @apiPermission all
 * @apiDescription Request media information.
 * @apiParam {Number} id Media unique ID.
 *
 * @apiSuccess {Object} media Media info.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 * "media": {
 * "media_id": 1,
 * "user_id": 1,
 * "filename": "a-beautiful-picture.jpg",
 * "filesize": 1000,
 * "media_type": "image/jpeg",
 * "title": "A beautiful picture",
 * "description": "A beautiful picture",
 * "created_at": "2021-08-31T11:27:58.000Z",
 * }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": {
 *  "we didnt find that media item you where looking for"
 * "status": 404
 * }
 *
 *
 *
 */
/**
 * @api {put} /api/media/:id Update media information
 * @apiVersion 1.0.0
 * @apiName PutMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiDescription Update media information.
 *
 * @apiParam {Number} id Media unique ID.
 * @apiParam {String} title Title of the media.
 * @apiParam {String} description Description of the media.
 * @apiParam {String} filename Filename of the media.
 *
 * @apiParamExample {json} Request-Example:
 * {
 * "title": "A beautiful picture",
 * "description": "A beautiful picture",
 * "filename": "a-beautiful-picture.jpg",
 * }
 *
 */

/**
 * @api {delete} /api/media/:id Delete media
 * @apiVersion 1.0.0
 * @apiName DeleteMedia
 * @apiGroup Media
 * @apiPermission token
 * @apiDescription Delete media.
 *
 * @apiParam {Number} id Media unique ID.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "Media deleted"
 * }
 *
 */
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
