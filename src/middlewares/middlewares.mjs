/*
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */

const logger = (req, res, next) => {
  console.log("Time:", new Date().toISOString(), req.method, req.url);
  next();
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Found, it was not. - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export { logger, notFoundHandler, errorHandler };
