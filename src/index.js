import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById, postItem } from "./items.js";
import { getMediaItems, getMediaById, postMedia } from "./media.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

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
///get item by id
app.get("/api/items/:id", getItemsById);
app.get("/api/media/:id", getMediaById);
///edit
app.put("/api/items");
///add new item
app.post("/api/items", postItem);
app.post("/api/media", postMedia);
///delete item
app.delete("/api/items");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
