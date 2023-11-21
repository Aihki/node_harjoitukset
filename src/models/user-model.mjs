import { promisePool } from "../utils/database.mjs";

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
 * Adds a new user to the database.
 * @param {object} user - The user object to add.
 * @param {string} user.username - The username of the new user.
 * @param {string} user.password - The password of the new user.
 * @param {string} user.email - The email of the new user.
 * @param {number} user.user_level_id - The user's level ID.
 * @returns {object} - new user.
 */
const addNewUser = async (user) => {
  const { username, password, email, user_level_id } = user;
  const sql = `INSERT INTO Users (username, password, email, user_level_id) VALUES (?,?,?,?)`;
  const params = [username, password, email, user_level_id];
  try {
    const rows = await promisePool.query(sql, params);
    return { user_id: rows[0].insertId };
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
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
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { allUsers, userById, addNewUser, updateUser, deleteUser };
