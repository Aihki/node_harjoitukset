The endpoint that are used in this here and examples of them

### GET /

GET http://127.0.0.1:3000/

### GET / items this get all of the items

GET http://127.0.0.1:3000/items

### GET / items/:id this get item by it's id

GET http://127.0.0.1:3000/items/

### delete / items/:id this deletes item by it's id

DELETE http://127.0.0.1:3000/items/7

### PUT / items/:id this updates item by it's id

PUT http://127.0.0.1:3000/items/
Content-Type: application/json

{
"id": 7,
"name": "tänään tehdään kurkkukeitto"
}

### POST/items this add new item

POST http://127.0.0.1:3000/items
Content-Type: application/json

{
"id" : 8,
"name": "tänään tehdään kurkkukeitto"
}
