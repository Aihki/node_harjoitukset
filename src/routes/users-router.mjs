import express from "express";
import {
  listOfAllUsers,
  newUser,
  putUser,
  removeUser,
  userByItsId,
} from "../controllers/users-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const usersRouter = express.Router();

///routes for /api/users
usersRouter.route("/").get(listOfAllUsers).post(newUser);

///routes for /api/users/:id
usersRouter
  .route("/:id")
  .get(userByItsId)
  .put(authenticateToken, putUser)
  .delete(authenticateToken, removeUser);

export default usersRouter;
