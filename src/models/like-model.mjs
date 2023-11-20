import { promisePool } from "../utils/database.mjs";

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

const deleteLike = async (id) => {
  const sql = `DELETE FROM likes WHERE like_id = ?`;
  const params = [id];
  try {
    const rows = await promisePool.query(sql, params);
    return { like_id: rows[0].insertId };
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

export { likeByMediaId, likeByUserId, addNewLike, deleteLike };
