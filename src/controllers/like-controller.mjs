import {
  addNewLike,
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

const newLike = async (req, res) => {
  const { user_id, media_id } = req.body;
  if (user_id && media_id) {
    const like = await addNewLike({ user_id, media_id });
    if (!like.error) {
      res.status(201);
      res.json(like);
    } else {
      res.sendStatus(400);
    }
  }
};

const removeLike = async (req, res) => {
  const like = await deleteLike(req.params.id);
  if (!like.error) {
    res.sendStatus(200);
    res.json(like);
  } else {
    res.sendStatus(400);
  }
};

export { mediaLikes, userLikes, newLike, removeLike };
