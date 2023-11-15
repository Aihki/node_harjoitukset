import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  updateUser,
} from "../controllers/users-controller.mjs";

const usersRouter = express.Router();

///routes for /api/users
usersRouter.route("/").get(getUsers).post(postUser);

///routes for /api/users/:id
usersRouter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default usersRouter;
