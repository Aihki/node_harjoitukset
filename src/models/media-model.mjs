import { promisePool } from "../utils/database.mjs";

/**
 * Retrieves all users from the database.
 * @returns {object} - A list of all media.
 */
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

/**
 * Retrieves a media by their ID from the database.
 * @param {number} id - The ID of the media to retrieve.
 * @returns {object} - A media by it id.
 */
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

/**
 * Adds new media items to the database.
 * @param {object} media - The media object to add.
 * @param {number} media.user_id - The ID of the user associated with the media item.
 * @param {string} media.filename - The filename of the media item.
 * @param {string} media.mimetype - The mimetype of the media item.
 * @param {string} media.title - The title of the media item.
 * @param {string} media.description - The description of the media item.
 * @param {number} media.size - The size of the media item.
 * @returns {object} - new media.
 */
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
/**
 * Updates media information in the database.
 * @param {number} id - The ID of the media item to update.
 * @param {object} media - The updated media object.
 * @param {string} media.filename - The updated filename.
 * @param {string} media.title - The updated title.
 * @param {string} media.description - The updated description.
 * @returns {object} - updated media.
 */
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

/**
 * Deletes a media item from the database by its ID.
 * @param {number} id - The ID of the media item to delete.
 * @returns {object} - deleted media item.
 */
const deleteMedia = async (id) => {
  const sql = `DELETE FROM mediaItems WHERE media_id = ?`;
  const params = [id];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].affectedRows > 0
      ? { message: "Media item deleted." }
      : { error: "Not Found" };
  } catch (error) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { allMedia, mediaById, addNewMedia, updateMedia, deleteMedia };
