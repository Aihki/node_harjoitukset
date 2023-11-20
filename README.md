### Media

### GET /

GET http://127.0.0.1:3000/

### GET /

GET http://127.0.0.1:3000/api/media

### GET / media/:id

GET http://127.0.0.1:3000/api/media/1

### POST/media

POST http://localhost:3000/api/media
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="title"

New media title k
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="user_id"

1
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="image.jpg"
Content-Type: image/jpeg

./scrum.png
------WebKitFormBoundary7MA4YWxkTrZu0gW--

### PUT / media/:id

PUT http://127.0.0.1:3000/api/media/4
Content-Type: application/json

{
"filename": "scrum.png",
"title": "Basement modified",
"description": "Some new description"
}

### delete / api/media/:id

DELETE http://127.0.0.1:3000/api/media/5

### User

### GET /user

GET http://127.0.0.1:3000/api/user/

### GET / api/user/:id

GET http://127.0.0.1:3000/api/user/2

### POST/ /api/user

POST http://127.0.0.1:3000/api/user
Content-Type: application/json

{

    "username": "luke",
    "password": "********",
    "email": "luke@example.com",
    "user_level_id": 2,
    "created_at": "2023-01-14T06:42:42.000Z"

}

### PUT / api/user/:id

PUT http://127.0.0.1:3000/api/user/1
Content-Type: application/json

{
"username": "yoda",
"password": "****\*\*\*****",
"email": "yoda@example.com"
}

### delete / api/user/:id

DELETE http://127.0.0.1:3000/api/user/4
