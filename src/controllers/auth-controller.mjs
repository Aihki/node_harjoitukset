import jwt from "jsonwebtoken";
import "dotenv/config";
import { login } from "../models/user-model.mjs";
import bcrypt from "bcryptjs";

const postlogin = async (req, res, next) => {
  const user = await login(req.body.username);

  if (!user) {
    const error = new Error("login failed, invalid username/password");
    error.status = 401;
    return next(error);
  }
  if (user.error) {
    return next(new Error(result.error));
  }
  console.log(user);
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (passwordMatch) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "logged in", token, user });
  } else {
    const error = new Error("login failed, invalid username/password");
    error.status = 401;
    return next(error);
  }
};

const getMe = (req, res) => {
  console.log(req.user);
  res.json(req.user);
};

export { postlogin, getMe };
