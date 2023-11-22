import { json } from "express";
import {
  addNewMedia,
  allMedia,
  deleteMedia,
  mediaById,
  updateMedia,
} from "../models/media-model.mjs";

/**
 * Retrieves a list of all media.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - A list of all media.
 */

const fullListOfMedia = async (req, res) => {
  const media = await allMedia();
  if (!media.error) {
    res.json(media);
  } else {
    res.status(500);
    res.json(media);
  }
};

/**
 * Retrieves a media by its id.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - A media.
 */

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

/**
 * adds a new media.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - new media.
 */

const newMedia = async (req, res) => {
  const { description, title } = req.body;
  const { filename, mimetype, size } = req.file;
  const user_id = req.user.user_id;
  if (user_id && title && filename) {
    try {
      const newMedia = {
        user_id,
        description,
        title,
        filename,
        mimetype,
        size,
      };
      const addMedia = await addNewMedia(newMedia);
      res
        .status(201)
        .json({ message: "New media has been added", ...addMedia });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.sendStatus(400);
  }
};

/**
 * Updates a media.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - updated media.
 */

const putMedia = async (req, res) => {
  const user_id = req.user.user_id;
  const { filename, title, description } = req.body;

  if (user_id && title && filename) {
    try {
      const media = { filename, title, description };
      const result = await updateMedia(user_id, media);

      if (result.error) {
        res.status(500).json(result);
      } else if (!result.message) {
        res.status(404).json({ error: "Media not found", media_id: user_id });
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

/**
 * Deletes a media.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - deleted media.
 */

const removeMedia = async (req, res) => {
  const user_id = req.user.user_id;
  console.log(user_id);
  if (user_id) {
    try {
      const result = await deleteMedia(user_id);
      if (result.error) {
        res.status(500).json(result);
      } else if (!result.message) {
        res.status(404).json({ error: "Media not found", media_id: user_id });
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

export { fullListOfMedia, mediaByItsId, newMedia, putMedia, removeMedia };
