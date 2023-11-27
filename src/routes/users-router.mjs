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
