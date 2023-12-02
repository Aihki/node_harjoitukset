import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import usersRouter from "./routes/users-router.mjs";
import {
  errorHandler,
  logger,
  notFoundHandler,
} from "./middlewares/middlewares.mjs";
import mediaRouter from "./routes/media-router.mjs";
import likeRouter from "./routes/like-router.mjs";
import authRouter from "./routes/auth-router.mjs";
import helmet from "helmet";
import session from "express-session";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(
  session({
    secret: "your-secret-key",
    name: "your-cookie-name",
  })
);

app.use(express.json());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
app.disable("x-powered-by");
app.use("/media", express.static(path.join(__dirname, "../uploads")));

app.use(logger);

app.get("/", (req, res) => {
  const values = { title: "Dummy REST API docs", message: "TODO: docs" };
  res.render("home", values);
});

///example generic items api
//get all items

app.use("/api/media", mediaRouter);

app.use("/api/user", usersRouter);

app.use("/api/likes", likeRouter);

app.use("/api/auth", authRouter);

///rest of the routes = error  handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
