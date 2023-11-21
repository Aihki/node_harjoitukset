import {
  addNewUser,
  allUsers,
  deleteUser,
  updateUser,
  userById,
} from "../models/user-model.mjs";

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
  const { username, password, email, user_level_id } = req.body;
  if (username && password && email && user_level_id) {
    try {
      const user = await addNewUser({
        username,
        password,
        email,
        user_level_id,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.sendStatus(400);
  }
};

/**
 * Updates a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - updated user.
 */

const putUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  if (id && username && password && email) {
    try {
      const updatedUser = { username, password, email };
      const result = await updateUser(id, updatedUser);

      if (result.error) {
        res.status(500).json(result);
      } else if (result.message === "Not Found") {
        res.status(404).json({ error: "Not Found", user_id: id });
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

/**
 * Removes a user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - deleted user.
 */

const removeUser = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const result = await deleteUser(id);
      if (result.error) {
        res.status(500).json(result);
      } else if (result.message === "Not Found") {
        res.status(404).json({ error: "Not Found", user_id: id });
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
