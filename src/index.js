import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import usersRouter from "./routes/users-router.mjs";
import mediaRouter from "./routes/media-Router.mjs";
import { logger } from "./middlewares/middlewares.mjs";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use(logger);

app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

///example generic items api
//get all items

app.use("/api/media", mediaRouter);

app.use("/api/user", usersRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
