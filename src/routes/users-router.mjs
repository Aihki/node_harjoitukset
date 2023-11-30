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

///routes for /api/users
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
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 * "users": [
 *  {
 *   "user_id": 1,
 *  "username": "yoda",
 * "email": "
 * "user_level_id": 2
 * },
 * {
 * "user_id": 2,
 * "username": "obiwan",
 * "email": "
 * "user_level_id": 2
 * },
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 * {
 * "error": {
 * "message": "No users found",
 * "status": 404
 * }
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
 * @apiParam {Number} id The users-ID.
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email Email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
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
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "error": {
 * "message": "No user found",
 * "status": 404
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
