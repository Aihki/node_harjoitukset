import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getItems, getItemsById, postItem } from "./items.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.get("/kukkuu", (req, res) => {
  const myResponse = { message: "No mutta kukkuu vaan!" };
  res.status(400);
  res.json(myResponse);
});

///example generic items api
//get all items
app.get("/api/items", getItems);
///get item by id
app.get("/api/items/:id", getItemsById);
///edit
app.put("/api/items");
///add new item
app.post("/api/items", postItem);
///delete item
app.delete("/api/items");

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
