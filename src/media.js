const mediaItems = [
  {
    media_id: 9632,
    filename: "ffd8.jpg",
    filesize: 887574,
    title: "Favorite drink",
    description: "",
    user_id: 1606,
    media_type: "image/jpeg",
    created_at: "2023-10-16T19:00:09.000Z",
  },
  {
    media_id: 9626,
    filename: "dbbd.jpg",
    filesize: 60703,
    title: "Miika",
    description: "My Photo",
    user_id: 3671,
    media_type: "image/jpeg",
    created_at: "2023-10-13T12:14:26.000Z",
  },
  {
    media_id: 9625,
    filename: "2f9b.jpg",
    filesize: 30635,
    title: "Aksux",
    description: "friends",
    user_id: 260,
    media_type: "image/jpeg",
    created_at: "2023-10-12T20:03:08.000Z",
  },
  {
    media_id: 9592,
    filename: "f504.jpg",
    filesize: 48975,
    title: "Desert",
    description: "",
    user_id: 3609,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:59:05.000Z",
  },
  {
    media_id: 9590,
    filename: "60ac.jpg",
    filesize: 23829,
    title: "Basement",
    description: "Light setup in basement",
    user_id: 305,
    media_type: "image/jpeg",
    created_at: "2023-10-12T06:56:41.000Z",
  },
];
/**
 *Gets all Media
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */

const getMediaItems = (req, res) => {
  res.json(mediaItems);
};
/**
 *Gets Media by its id
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */
const getMediaById = (req, res) => {
  console.log(req.params);
  const media = mediaItems.find((element) => element.media_id == req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.status(404);
    res.json({ message: "404 Media not found!" });
  }
};
/**
 *post new Media
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */

const postMedia = (req, res) => {
  console.log("new media posted", req.body);
  if (req.body) {
    mediaItems.push({
      filename: req.body.filename,
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id,
      media_type: req.body.media_type,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

/**
 *updates Media by its id
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */
const updateMedia = (req, res) => {
  const media = mediaItems.find((element) => element.media_id == req.params.id);
  if (media) {
    media.title = req.body.title;
    media.description = req.body.description;
    res.json(media);
  } else {
    res.status(404);
    res.json({ message: "404 Media not found!" });
  }
};

/**
 *deletes media by its id
 *
 * @param {object} req -http request
 * @param {object} res -http response
 */

const deleteMedia = (req, res) => {
  const media = mediaItems.findIndex(
    (element) => element.media_id == req.params.id
  );
  console.log(media);
  if (media) {
    mediaItems.splice(mediaItems.indexOf(media), 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "404 Media not found!" });
  }
  }
};

///comments

export {
  mediaItems,
  getMediaItems,
  getMediaById,
  postMedia,
  updateMedia,
  deleteMedia,
};
