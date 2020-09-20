<h1 align="center">ExpressJS - Technoker RESTfull API</h1>


Technoker is a job seeker website and we built this backend with Node JS and Express JS.
[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-v4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v13.5.0-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name **evday_pos**, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost // Database host
DB_USER=your_user
DB_PASS=yout_password
DB_NAME=your_database

PORT=this_project_port //example: 3000
IP=this_poject_ip_address // example: 127.0.0.1
FRONTEND_LINK=..
```
## Postman Documentation
Check Postman documetation here https://documenter.getpostman.com/view/12631524/TVKBYJ1S#2f2e14c5-d4c4-455a-b70b-238518a7f521

## End Point
**1. GET**

- `/user` (Get all worker)

  - `{ "orderBy": "user_id", "limit": 5, "page" : 1 }`

- `/user/search` (Get worker by name)

  - `{ "name": "naldi" }`

- `/user/:id` (Get worker by id)

- `/recruiter/:id` (Get recruiter by id)

- `/notification/:role/:id` (Get notification by user)

- `/notification/unread/:role/:id` (Get count notif)

- `/chat/user/:id` (Get worker room)

- `/chat/recruiter/:id` (Get recruiter room)

- `/chat/:id` (Get room by id)

  - `{ "page": 1, "limit": 3, "sort" : "history_created_at ASC" }`

**2. POST**

- `/user/login` (Login worker)

  - `{ "user_email": "email@example.com", "user_password": "12345678"}`

- `/user/register` (Register worker)

  - `{ "user_name": "Jenifer Kim", "user_email": "jenifer@gmail.com", "user_phone": 081356713178, "user_password": "jenifer12345", "user_confirm_password": "jenifer12345" }`

- `/user/forgot-password` (Forgot password worker)

  - `{ "orders": [{ "product_id": 1, "qty": 2 }, { "product_id": 7, "qty": 2 }] }`

- `/users/register` (Post User Register)

  - `{ "user_email": "arizal123@gmail.com", "user_password": "12345678", "user_name": "arizal123" }`

- `/users/login` (Post User Login)
  - `{ "user_email": "arizal123@gmail.com", "user_password": "12345678" }`

**3. PATCH**

- `/product/:id` (Update product by id)

  - `{"product_name" : "Lemon Tea", "category_id" : 2, "product_harga" : 12000, "product_status" : 1 | 0}`

- `/category/:id` (Update category by id)

  - `{ "category_name": "Noodles" }`

- `/users/:id` (Update user by id)
  - `{ "user_name": "arizal321", "user_role": 1 | 2, "user_status": 0 | 1 }`

**4. DELETE**

- `/product/:id` (Delete product by id)

- `/category/:id` (Delete category by id)
...
