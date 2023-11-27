import multer from "multer";
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      const error = new Error(
        "Incomplete, the task is. No files to add, there were."
      );
      error.status = 400;
      cb(error, false);
    }
  },
});
export default upload;
