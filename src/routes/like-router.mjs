import express from "express";
import {
  deleteLikeById,
  mediaLikes,
  userLikes,
} from "../controllers/like-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const likeRouter = express.Router();

/**
 * @api {get} /api/likes/media/:id Get likes by media id
 * @apiVersion 1.0.0
 * @apiName GetLikesByMediaId
 * @apiGroup Likes
 * @apiPermission all
 * @apiDescription Get likes by media id.
 *
 * @apiSuccess {Object[]} likes List of likes.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *  "likes": [
 *   {
 *   "like_id": 1,
 *  "user_id": 1,
 * "media_id": 1,
 * "created_at": "2021-08-31T11:27:58.000Z",
 * },
 * {
 * "like_id": 2,
 * "user_id": 2,
 * "media_id": 1,
 * "created_at": "2021-08-31T11:27:58.000Z",
 * },
 *
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 * {
 * "error": {
 * "message": "No likes found",
 * "status": 404
 * }
 * }
 *
 *
 */
likeRouter.route("/media/:id").get(mediaLikes);

/**
 * @api {get} /api/likes/user/:id Get likes by user id
 * @apiVersion 1.0.0
 * @apiName GetLikesByUserId
 * @apiGroup Likes
 * @apiPermission all
 * @apiDescription Get likes by user id.
 *
 *
 * @apiSuccess {Object[]} likes List of likes.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "likes": [
 * {
 * "like_id": 1,
 * "user_id": 1,
 * "media_id": 1,
 * "created_at": "2021-08-31T11:27:58.000Z",
 * },
 *
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": {
 * "message": "No likes found",
 * "status": 404
 * }
 *
 */

///routes for /api/likes/user/:id
likeRouter.route("/user/:id").get(userLikes);

///delete like by id /api/likes/:id

/**
 * @api {delete} /api/likes/:id Delete a like
 * @apiVersion 1.0.0
 * @apiName DeleteLike
 * @apiGroup Likes
 * @apiPermission token
 * @apiDescription Deletes a like.
 * @apiSuccess {Object[]} like Deleted like.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "Like deleted",
 * "like": {
 * "like_id": 1,
 * "user_id": 1,
 * "media_id": 1,
 * "created_at": "2021-08-31T11:27:58.000Z",
 * },
 * }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": {
 * "message": "Like not found",
 * "status": 404
 * }
 * }
 */
likeRouter.route("/:id").delete(authenticateToken, deleteLikeById);

export default likeRouter;
