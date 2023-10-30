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

const getItems = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  const jsonItems = JSON.stringify(items);
  res.end(`{"message": "All items", "items": ${jsonItems}}`);
};

const getItemsById = (res, id) => {
  const item = items.find((element) => element.id == id);
  if (item) {
    res.writeHead(200, { "Content-Type": "application/json" });
    console.log(item);
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(`{"message": "404 Resource not found!"}`);
  }
};
const postItem = (req, res) => {
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
        res.end(`{"message": "bad request."}`);
        return;
      }
      const newId = items[items.length - 1].id + 1;
      items.push({ id: newId, name: body.name });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(`{"message": "New omena added."}`);
    });
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
