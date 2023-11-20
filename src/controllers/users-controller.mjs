import {
  addNewUser,
  allUsers,
  deleteUser,
  updateUser,
  userById,
} from "../models/user-model.mjs";

const listOfAllUsers = async (req, res) => {
  const users = await allUsers();
  if (!users.error) {
    res.json(users);
  } else {
    res.status(500);
    res.json({ users });
  }
};

const userByItsId = async (req, res) => {
  const user = await userById(req.params.id);
  if (!user.error) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const newUser = async (req, res) => {
  const { username, password, email, user_level_id } = req.body;
  if (username && password && email && user_level_id) {
    const user = await addNewUser({ username, password, email, user_level_id });
    if (!user.error) {
      res.status(201);
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  }
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  if (id && username && password && email) {
    // TODO: add error handling when database error occurs
    const updatedUser = { username, password, email };
    const result = await updateUser (id, updatedUser);

    if (result) {
      if (result.error) {
        res.status(500).json(result);
      }
      res.json(result);
    } else {
      res.status(404).json({ error: "Not Found", user_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await deleteUser(id);
    if (result) {
      if (result.error) {
        res.status(500);
      }
      res.json(result);
    } else {
      res.status(404);
      res.json({ error: "Not Found", user_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

export { listOfAllUsers, userByItsId, newUser, putUser, removeUser };
