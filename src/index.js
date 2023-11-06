import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById, postItem } from "./items.js";
import {
  getMediaItems,
  getMediaById,
  postMedia,
  updateMedia,
  deleteMedia,
} from "./media.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  postUser,
  updateUser,
} from "./users.js";

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
app.get("/api/items", getItems);
app.get("/api/media", getMediaItems);
app.get("/api/user", getUsers);
///get item by id
app.get("/api/items/:id", getItemsById);
app.get("/api/media/:id", getMediaById);
app.get("/api/user/:id", getUserById);
///edit
app.put("/api/items");
app.put("/api/media/:id", updateMedia);
app.put("/api/user/:id", updateUser);
///add new item
app.post("/api/items", postItem);
app.post("/api/media", postMedia);
app.post("/api/user", postUser);
///delete item
app.delete("/api/items");
app.delete("/api/media/:id", deleteMedia);
app.delete("/api/user/:id", deleteUser);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
