import { promisePool } from "../utils/database.mjs";

/**
 * Fetch user from database by username and password
 * @param {object}  credits- -contains username and password
 * @returns
 */
const login = async (username) => {
  try {
    const sql = `SELECT user_id, username,password, user_level_id, email 
                FROM Users WHERE username = ? `;
    const params = [username];
    const result = await promisePool.query(sql, params);
    const [rows] = result;
    return rows[0];
  } catch (error) {
    console.log("error", error.message);
    return { error: error.message };
  }
};

/**
 * Retrieves all users from the database.
 * @returns {object} - A list of all users.
 */
const allUsers = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

/**
 * Retrieves a user by their ID from the database.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {object} - A user by it id.
 */
const userById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

/**
 * Creates a new user in the database
 *
 * @param {object} -user data
 * @returns {number} - id of the inserted user in db
 */
const addNewUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

/**
 * Updates a user in the database.
 * @param {number} id - The ID of the user to update.
 * @param {object} updated - The updated user object.
 * @param {string} updated.username - The updated username.
 * @param {string} updated.password - The updated password.
 * @param {string} updated.email - The updated email.
 * @returns {object} - updated user.
 */
const updateUser = async (id, updated) => {
  const { username, password, email } = updated;
  const sql =
    "UPDATE Users SET username=?, password=?, email=? WHERE user_id=?";
  const params = [username, password, email, id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "User updated." }
      : { error: "Not Found" };
  } catch (error) {
    console.error("error", e.message);
    return { error: e.message };
  }
};
/**
 * Deletes a user from the database by their ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {object} - deleted user.
 */
const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id=?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "user  deleted." }
      : { error: "Not Found" };
  } catch (error) {
    console.error("error", error.message);
    return { error: error.message };
  }
};

export { allUsers, userById, addNewUser, updateUser, deleteUser, login };
