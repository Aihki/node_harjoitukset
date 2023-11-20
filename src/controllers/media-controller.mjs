import {
  addNewMedia,
  allMedia,
  deleteMedia,
  mediaById,
  updateMedia,
} from "../models/media-model.mjs";

const fullListOfMedia = async (req, res) => {
  const media = await allMedia();
  if (!media.error) {
    res.json(media);
  } else {
    res.status(500);
    res.json(media);
  }
};

const mediaByItsId = async (req, res) => {
  const media = await mediaById(req.params.id);
  if (media) {
    if (media.error) {
      res.status(500);
    }
    res.json(media);
  } else {
    res.status(404);
    res.json({ error: "we didnt find that media item you where looking for" });
  }
};

const newMedia = async (req, res) => {
  const { user_id, description, title } = req.body;
  const { filename, mimetype, size } = req.file;
  if (user_id && title && filename) {
    const newMedia = {
      user_id,
      description,
      title,
      filename,
      mimetype,
      size,
    };
    const addMedia = await addNewMedia(newMedia);
    res.status(201);
    res.json({ message: "New media has be added", ...addMedia });
  } else {
    res.sendStatus(400);
  }
};

const putMedia = async (req, res) => {
  const { id } = req.params;
  const { filename, title, description } = req.body;

  if (id && title && filename) {
    const media = { filename, title, description };
    const result = await updateMedia(id, media);

    if (result) {
      if (result.error) {
        res.status(500).json(result);
      }
      res.json(result);
    } else {
      res.status(404).json({ error: "Not Found", media_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

const removeMedia = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await deleteMedia(id);
    if (result) {
      if (result.error) {
        res.status(500);
      }
      res.json(result);
    } else {
      res.status(404);
      res.json({ error: "Not Found", media_id: id });
    }
  } else {
    res.sendStatus(400);
  }
};

export { fullListOfMedia, mediaByItsId, newMedia, putMedia, removeMedia };
