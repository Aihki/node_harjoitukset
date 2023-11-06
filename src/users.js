const users = [
  {
    user_id: 260,
    username: "VCHar",
    password: "********",
    email: "vchar@example.com",
    user_level_id: 1,
    created_at: "2020-09-12T06:56:41.000Z",
  },
  {
    user_id: 305,
    username: "Donatello",
    password: "********",
    email: "dona@example.com",
    user_level_id: 1,
    created_at: "2021-12-11T06:00:41.000Z",
  },
  {
    user_id: 3609,
    username: "Anon5468",
    password: "********",
    email: "x58df@example.com",
    user_level_id: 3,
    created_at: "2023-04-02T05:56:41.000Z",
  },
];
/**
 *Gets all users
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */

const getUsers = (req, res) => {
  res.json(users);
};
/**
 *Gets user by its id
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */
const getUserById = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    res.json({ message: "404 Media not found!" });
  }
};
/**
 *creates new user
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */

const postUser = (req, res) => {
  console.log("new media posted", req.body);
  if (req.body) {
    users.push({
      user_id: req.body.user_id,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      user_level_id: req.body.user_level_id,
      created_at: req.body.created_at,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

/**
 *this upadtes existing user
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */
const updateUser = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);
  if (user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    res.json(user);
  } else {
    res.status(404);
    res.json({ message: "404 Media not found!" });
  }
};

/**
 *deletes user by its id
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */
const deleteUser = (req, res) => {
  const user = users.find((element) => element.user_id == req.params.id);

  if (user) {
    users.splice(users.indexOf(user), 1);
    res.json(user);
  } else {
    res.status(404);
    res.json({ message: "404 Media not found!" });
  }
};

//comments

export { getUsers, getUserById, postUser, updateUser, deleteUser };
