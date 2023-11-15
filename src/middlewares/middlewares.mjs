/*
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */

const logger = (req, res, next) => {
  console.log("Time:", new Date().toISOString(), req.method, req.url);
  next();
};

export { logger };
