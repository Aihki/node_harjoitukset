import {
  deleteLike,
  likeByMediaId,
  likeByUserId,
} from "../models/like-model.mjs";

const mediaLikes = async (req, res) => {
  const likes = await likeByMediaId(req.params.id);
  if (!likes.error) {
    res.json(likes);
  } else {
    res.sendStatus(404);
  }
};

const userLikes = async (req, res) => {
  const likes = await likeByUserId(req.params.id);
  if (!likes.error) {
    res.json(likes);
  } else {
    res.sendStatus(404);
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

const deleteLikeById = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await deleteLike(id);
    if (result) {
      if (result.error) {
        res.status(500);
      }
      res.json(result);
    } else {
      res.status(404);
      res.json({ error: "Not Found", like_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

export { mediaLikes, userLikes, deleteLikeById };
