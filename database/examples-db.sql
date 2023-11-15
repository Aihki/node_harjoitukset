DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;
--create tables
CREATE TABLE UserLevels (
  user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_level VARCHAR(255) NOT NULL
);
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_level_id) REFERENCES UserLevels(user_level_id)
);
CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE Views(
    view_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    view_count INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (view_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

--add user levels
INSERT INTO UserLevels 
    VALUES (1, 'admin'), (2, 'user'), (3, 'guest'), (4, 'Master splinter');
--add users
INSERT INTO Users 
    VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 3, null);
INSERT INTO Users 
    VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 2, null);

    INSERT INTO Users
        VALUES (270, 'Raphael', 'secret345', 'raph@example.com', 2, null),
           (280, 'Leonardo', 'secret456', 'leon@example.com', 1, null),
           (290, 'Michelangelo','secret567', 'mich@example.com', 2, null),
           (300,'Hamato Yoshi','secret678', 'yoshi@example.com', 4, null);

--add media items
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type, created_at) 
    VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg', null),
        ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg', null),
        ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg', null),
        ('pizza.jpg',3455, 'Pizza', 'My favourite pizza',290, 'image/jpg',null),
        ('book.jpg',2705, 'Book', 'My favourite book', 280, 'image/jpg',null),
        ('something.jpg',3455, 'something', 'something',270, 'image/jpg',null),
        ('famlily.jpg',3455, 'Family', 'My family',300, 'image/jpg',null);


--add views
    INSERT INTO Views (user_id, view_count, created_at)
    VALUES (290, 200, null),
       (280, 100, null),
       (270, 300, null),
       (300, 400, null),
       (260, 500, null),
       (305, 600, null);
     



--shows all tables
select * from UserLevels;
select * from Users;
select * from MediaItems;
select * from Views;

--select tables
select filename,title,  username from mediaitems, users where users.user_id=mediaitems.user_id;
select filename, title, username from mediaitems JOIN users ON users.user_id=mediaitems.user_id;
--shows username and user level
select username, user_level from users, userlevels where users.user_level_id=userlevels.user_level_id;
select username, user_level from users JOIN userlevels ON users.user_level_id=userlevels.user_level_id;
--shows username and user level and media type
select username, user_level, media_type from users JOIN userlevels ON users.user_level_id=userlevels.user_level_id JOIN mediaitems ON users.user_id=mediaitems.user_id;
--shows username and user level and media type and title
select username, user_level, media_type, title from users JOIN userlevels ON users.user_level_id=userlevels.user_level_id JOIN mediaitems ON users.user_id=mediaitems.user_id;

--delete from table;
DELETE FROM mediaitems WHERE media_id = 1;
DELETE FROM mediaitems WHERE media_id = 2;
DELETE FROM mediaitems WHERE media_id = 3;
select * from mediaitems;

--update table
UPDATE mediaitems SET title = 'My favourite drink' WHERE media_id = 4;
select * from mediaitems;




