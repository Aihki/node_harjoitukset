import { promisePool } from "../utils/database.mjs";

const allUsers = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

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

const updateUser = async (id, updatedUser) => {
  const { username, password, email } = updatedUser;
  const sql =
    "UPDATE Users SET username=?, password=?, email=? WHERE user_id=?";
  const params = [username, password, email, id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "User updated." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE user_id=?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "user  deleted." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { allUsers, userById, addNewUser, updateUser, deleteUser };
