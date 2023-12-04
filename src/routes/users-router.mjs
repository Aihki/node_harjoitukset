import express from "express";
import {
  listOfAllUsers,
  newUser,
  putUser,
  removeUser,
  userByItsId,
} from "../controllers/users-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";
import { body } from "express-validator";

const usersRouter = express.Router();

/**
 * @api {get} /api/users Get all users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Get all users.
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email User's email.
 * @apiSuccess {Number} users.user_level_id User level ID.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   "users": [
 *     {
 *       "user_id": 1,
 *       "username": "yoda",
 *       "email": "yoda@example.com",
 *       "user_level_id": 2
 *     },
 *     {
 *       "user_id": 2,
 *       "username": "obiwan",
 *       "email": "obiwan@example.com",
 *       "user_level_id": 2
 *     }
 *   ]
 * }
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 * {
 *   "error": {
 *     "message": "No users found",
 *     "status": 404
 *   }
 * }
 */

/** @api {post} /api/users Create a new user
 * @apiVersion 1.0.0
 * @apiName PostUser
 * @apiGroup Users
 * @apiPermission all
 * @apiHeader all
 * @apiDescription Create a new user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {String} email Email of the user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "username": "yoda",
 * "password": "yoda123456789",
 * "email": "
 * }
 *
 *@apiSuccess {Object} user User object.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Number} user.user_level_id User level ID.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "user": {
 *  "user_id": 1,
 * "username": "yoda",
 * "email": "
 * "user_level_id": 2
 * }
 * }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 * "error": {
 * "message": "Username already exists",
 * "status": 400
 * }
 * }
 *
 *
 */

usersRouter
  .route("/")
  .get(listOfAllUsers)
  .post(
    body("email").trim().isEmail(),
    body("username").trim().isLength({ min: 3, max: 10 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 12 }),
    newUser
  );

///routes for /api/users/:id

/**
 * @api {get} /api/users/:id Get a user by its id
 * @apiVersion 1.0.0
 * @apiName GetUserById
 * @apiGroup Users
 * @apiPermission all
 * @apiDescription Get a user by its id.
 *
 * @apiSuccess {Object} user User object.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Number} user.user_level_id User level ID.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "user": {
 *     "user_id": 1,
 *     "username": "yoda",
 *     "email": "yoda@example.com",
 *     "user_level_id": 2
 *   }
 * }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "error": {
 *     "message": "No user found",
 *     "status": 404
 *   }
 * }
 */

/**
 * @api {put} /api/users/:id Update a user by its id
 * @apiVersion 1.0.0
 * @apiName PutUserById
 * @apiGroup Users
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiDescription Update a user by its id.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 * @apiParam {String} email Email of the user.
 * @apiParamExample {json} Request-Example:
 * {
 * "username": "yoda",
 * "password": "yoda123456789",
 * "email": "
 * }
 *
 * @apiSuccess {Object} user User object.
 * @apiSuccess {Number} user.user_id User ID.
 * @apiSuccess {String} user.username Username.
 * @apiSuccess {String} user.email User's email.
 * @apiSuccess {Number} user.user_level_id User level ID.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user": {
 * "user_id": 1,
 * "username": "yoda",
 * "email": "
 * "user_level_id": 2
 * }
 *
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 * "error": {
 * "message": "Username already exists",
 * "status": 400
 * }
 *}
 */

/**
 * @api {delete} /api/users/:id Delete a user by its id
 * @apiVersion 1.0.0
 * @apiName DeleteUserById
 * @apiGroup Users
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiDescription Delete a user by its id.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "user  deleted."
 * }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": {
 * "message": "user not found",
 * "status": 404
 * }
 * }
 *
 *
 */
usersRouter
  .route("/:id")
  .get(userByItsId)
  .put(
    authenticateToken,
    body("username").trim().isLength({ min: 3, max: 10 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 12 }),
    body("email").trim().isEmail(),
    putUser
  )
  .delete(authenticateToken, removeUser);

export default usersRouter;
