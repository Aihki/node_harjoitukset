import {
  deleteLike,
  likeByMediaId,
  likeByUserId,
} from "../models/like-model.mjs";

/**
 * get likes by media id.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - likes.
 */
const mediaLikes = async (req, res) => {
  const likes = await likeByMediaId(req.params.id);
  if (!likes.error) {
    res.json(likes);
  } else {
    res.sendStatus(500);
  }
};
/**
 * get likes by user id.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - likes.
 */
const userLikes = async (req, res) => {
  const likes = await likeByUserId(req.params.id);
  if (!likes.error) {
    res.json(likes);
  } else {
    res.sendStatus(500);
  }
};

const addNewLike = async (req, res) => {
  const { user_id, media_id } = req.body;
  if (user_id && media_id) {
    const newLike = { user_id, media_id };
    const addLike = await addNewLike(newLike);
    res.status(201);
    res.json({ message: "New like has be added", ...addLike });
  } else {
    res.sendStatus(400);
  }
};

/**
 * Deletes a like.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - deleted like.
 */
const deleteLikeById = async (req, res) => {
  const user_id = req.user.user_id;
  if (user_id) {
    try {
      const result = await deleteLike(user_id);
      if (result.error) {
        res.status(500).json(result);
      } else if (!result.message) {
        res.status(404).json({ error: "Like not found", like_id: user_id });
      } else {
        res.json(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.sendStatus(400);
  }
};

export { mediaLikes, userLikes, deleteLikeById };
