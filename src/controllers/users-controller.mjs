import { validationResult } from "express-validator";
import {
  addNewUser,
  allUsers,
  deleteUser,
  updateUser,
  userById,
} from "../models/user-model.mjs";
import bcrupt from "bcryptjs";

/**
 * Retrieves a list of all users.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - A list of all users.
 */
const listOfAllUsers = async (req, res) => {
  const users = await allUsers();
  if (!users.error) {
    res.json(users);
  } else {
    res.status(500);
    res.json({ users });
  }
};

/**
 * Retrieves a user by its id.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - A user.
 */

const userByItsId = async (req, res) => {
  try {
    const user = await userById(req.params.id);
    if (!user.error) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

/**
 * adds a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - new user.
 */

const newUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ message: "Invalid data" });
  }
  const newUser = req.body;
  const salt = await bcrupt.genSalt(10);
  newUser.password = await bcrupt.hash(newUser.password, salt);
  const user = await addNewUser(newUser);
  res.status(201).json({ message: "User created", user_id: user });
};

/**
 * Updates a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - updated user.
 */

const putUser = async (req, res, next) => {
  const user_id = req.user.user_id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ message: "Invalid data" });
  }
  const result = await updateUser(user_id, req.body);
  res.status(201).json({ message: "User updated", user_id: result });
};

/**
 * Removes a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - deleted user.
 */

const removeUser = async (req, res) => {
  const user_id = req.user.user_id;
  if (user_id) {
    try {
      const result = await deleteUser(user_id);
      if (result.error) {
        res.status(500).json(result);
      } else if (result.message === "Not Found") {
        res.status(404).json({ error: "Not Found", user_id: user_id });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.sendStatus(400);
  }
};

export { listOfAllUsers, userByItsId, newUser, putUser, removeUser };
