// mock items data
const items = [
  { id: 5, name: "Miksi kana meni tielle? Katsomaan toista puolta." },
  {
    id: 6,
    name: "Miksi tietokone ei voi syödä? Koska se on kova levyn päällä!",
  },
  {
    id: 7,
    name: "Mitä yksi seinä sanoi toiselle seinälle? Tavataan kulmassa!",
  },
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemsById = (req, res) => {
  console.log(req.params);
  const item = items.find((element) => element.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: "404 Resource not found!" });
  }
};
const postItem = (req, res) => {
  console.log("new item posted", req.body);
  if (req.body.name) {
    items.push({ id: items.length + 1, name: req.body.name });

    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

const updateItem = (req, res) => {
  let body = [];
  req
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log("req body", body);
      body = JSON.parse(body);

      if (!body.name) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(`{"message": "Missing data."}`);
        return;
      }
      const item = items.find((element) => element.id == body.id);

      if (item) {
        item.name = body.name;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end('{"message": "Item updated."}');
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end('{"message": "Item not found."}');
      }
    });
};
const deleteItem = (res, id) => {
  const item = items.find((element) => element.id == id);
  if (item) {
    items.splice(items.indexOf(item), 1);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end('{"message": "Item deleted."}');
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end('{"message": "Item not found."}');
  }
};

export { items, getItems, getItemsById, postItem, deleteItem, updateItem };
