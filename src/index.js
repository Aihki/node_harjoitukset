import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  updateUser,
} from "./controllers/users-controller.mjs";
import mediaRouter from "./routes/media-Router.mjs";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use((req, res, next) => {
  console.log("Time:", Date.now(), req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

app.get("/kukkuu", (req, res) => {
  const myResponse = { message: "No mutta kukkuu vaan!" };
  res.status(400);
  res.json(myResponse);
});

app.get("/:message", (req, res) => {
  const values = { title: "Dummy REST API docs", message: req.params.message };
  res.render("home", values);
});

///example generic items api
//get all items

app.use("/api/media", mediaRouter);

app.get("/api/user", getUsers);
app.get("/api/user/:id", getUserById);
app.put("/api/user/:id", updateUser);
app.post("/api/user", postUser);
app.delete("/api/user/:id", deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
