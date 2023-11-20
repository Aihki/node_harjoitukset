import { promisePool } from "../utils/database.mjs";

const allMedia = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM MediaItems");
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

const mediaById = async (id) => {
  try {
    const sql = "SELECT * FROM mediaItems WHERE media_id = ?";
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    return rows[0];
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

const addNewMedia = async (media) => {
  const { user_id, filename, mimetype, title, description, size } = media;
  const sql = `INSERT INTO mediaItems (user_id, filename, media_type, title, description, filesize) VALUES (?,?,?,?,?,?)`;
  const params = [user_id, filename, mimetype, title, description, size];
  try {
    const rows = await promisePool.query(sql, params);
    return { media_id: rows[0].insertId };
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

const updateMedia = async (id, media) => {
  const { filename, title, description } = media;
  const sql = `UPDATE mediaItems SET filename=?, title=?, description=? WHERE media_id=?`;
  const params = [filename, title, description, id];
  try {
    const results = await promisePool.query(sql, params);
    return results[0].affectedRows > 0
      ? { message: "Media updated" }
      : { error: "Not Found" };
  } catch (error) {
    console.log(error, error.message);
    return { error: error.message };
  }
};

const deleteMedia = async (id) => {
  const sql = `DELETE FROM mediaItems WHERE media_id = ?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "Media item deleted." }
      : { error: "Not Found" };
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { allMedia, mediaById, addNewMedia, updateMedia, deleteMedia };
