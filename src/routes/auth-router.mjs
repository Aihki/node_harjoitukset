import express from "express";
import { getMe, postlogin } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const authRouter = express.Router();
/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": {
 *         "message": "username/password invalid",
 *         "status": 401
 *       }
 *     }
 */

/**
 * @api {post} /login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "username": "yoda",
 *      "password": "Ingoodhandsthepasswordishmmm."
 *    }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Logged in successfully",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IkpvaG5Eb2UiLCJ1c2VyX2xldmVsX2lkIjoyLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDA2NDQ2MDN9.RVuBVbD23DcHvZ1RAad5Ef7ouwqtxj3CMutXqHUF2jw"
"
 *      "user": {
 *        "user_id": 21,
 *        "username": "yoda",
 *        "email": "yoda@example.com",
 *        "user_level_id": 2
 *      }
 *    }
 *
 * @apiUse UnauthorizedError
 */
authRouter.route("/login").post(postlogin);

/**
 * @api {get} /auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level_id User level id of the User.
 * @apiSuccess {Number} user.iat Token creation timestamp.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 21,
 *       "username": "yoda",
 *       "email": "yoda@example.com",
 *       "user_level_id": 2,
 *       "iat": 1701279021
 *     }
 *
 * @apiError InvalidToken Authentication token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "invalid token"
 *     }
 */
authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;
