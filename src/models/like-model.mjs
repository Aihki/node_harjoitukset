import { promisePool } from "../utils/database.mjs";

/**
 * Retrieves likes by media ID from the database.
 * @param {number} id - The ID of the media item to retrieve likes for.
 * @returns {object} - A list of likes by media id.
 */
const likeByMediaId = async (id) => {
  try {
    const sql = "SELECT * FROM likes WHERE media_id = ?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

/**
 * Retrieves likes by user ID from the database.
 * @param {number} id - The ID of the user to retrieve likes for.
 * @returns {object} - A list of likes by user id.
 */
const likeByUserId = async (id) => {
  try {
    const sql = "SELECT * FROM likes WHERE user_id = ?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

const addNewLike = async (like) => {
  const { user_id, media_id } = like;
  const sql = `INSERT INTO likes (user_id, media_id) VALUES (?,?)`;
  const params = [user_id, media_id];
  try {
    const rows = await promisePool.query(sql, params);
    return { like_id: rows[0].insertId };
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

/**
 * Deletes a like from the database by its ID.
 * @param {number} id - The ID of the like to delete.
 * @returns {object} - deleted like.
 */
const deleteLike = async (id) => {
  const sql = `DELETE FROM likes WHERE like_id = ?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "like  deleted." }
      : { error: "Not Found" };
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

export { likeByMediaId, likeByUserId, addNewLike, deleteLike };
