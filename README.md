The endpoint that are used in this here and examples of them

### GET /

GET http://127.0.0.1:3000/

### GET / api/media this get all of the media

GET http://127.0.0.1:3000/api/media

### GET /api/media/:id this get media by it's id

DELETE http://127.0.0.1:3000/api/media/9590

### PUT /api/media/:id this updates media by it's id

PUT http://127.0.0.1:3000/api/media/9590
Content-Type: application/json

{
"title": "Basement modified",
"description": "Some new description"
}

### POST api/media this add new media

POST http://127.0.0.1:3000/api/media
Content-Type: application/json

{
"filename": "60ac.jpg",
"title": "New image",
"description": "The description of the new image",
"user_id": 305,
"media_type": "image/jpeg"
}

### delete / api/media/:id this deletes media by it id

DELETE http://127.0.0.1:3000/api/media/9590

The endpoint that are used in this here and examples of them

### GET /

GET http://127.0.0.1:3000/

### GET / api/user this get all of the users

GET http://127.0.0.1:3000/api/media

### GET /api/user/:id this get user by it's id

DELETE http://127.0.0.1:3000/api/media/9590

### PUT /api/user/:id this updates user by it's id

PUT http://127.0.0.1:3000/api/media/9590
Content-Type: application/json

{
"username": "Yoda2",
"password": "**\*\*\*\***\*\***\*\*\*\***",
"email": "yoda2@example.com"
}

### POST api/user this add new user

POST http://127.0.0.1:3000/api/media
Content-Type: application/json

{
"user_id": 42,
"username": "Yoda",
"password": "**\*\*\*\***",
"email": "yoda@example.com",
"user_level_id": 2,
"created_at": "2023-01-14T06:42:42.000Z"
}

### delete / api/user/:id this deletes user by it id

DELETE http://127.0.0.1:3000/api/media/9590
