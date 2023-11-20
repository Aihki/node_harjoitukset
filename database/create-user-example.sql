CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `database`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;