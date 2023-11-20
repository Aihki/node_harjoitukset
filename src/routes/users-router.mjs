import express from "express";
import {
  listOfAllUsers,
  newUser,
  putUser,
  removeUser,
  userByItsId,
} from "../controllers/users-controller.mjs";

const usersRouter = express.Router();

///routes for /api/users
usersRouter.route("/").get(listOfAllUsers).post(newUser);

///routes for /api/users/:id
usersRouter.route("/:id").get(userByItsId).put(putUser).delete(removeUser);

export default usersRouter;
