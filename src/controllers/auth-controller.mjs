import jwt from "jsonwebtoken";
import "dotenv/config";
import { login } from "../models/user-model.mjs";

const postlogin = async (req, res) => {
  const user = await login(req.body);

  try {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: "logged in", token, user });
  } catch (error) {
    res
      .status(401)
      .json({ message: "login failed, invalid username/password" });
  }
};

const getMe = (req, res) => {
  console.log(req.user);
  res.json(req.user);
};

export { postlogin, getMe };
