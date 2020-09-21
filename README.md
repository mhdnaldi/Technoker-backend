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

  - `{ "user_email": "mail@example.com" }`
  
- `/skill` (Post skill)

  - `{ "skill_name": "ExpressJS", "user_id": 1 }`
  
- `/recruiter/register` (Create recruiter account)

  - `{ "recruiter_name": "Jenny Doe", "recruiter_email": "jennydoe@mail.com", "recruiter_company": "Microsoft Inc.", "recruiter_position": "HRD", "recruiter_phone": 0812345678, "recruiter_password": "jennydoe", "recruiter_password_confirmation": "jennydoe" }`
  
- `/recruiter/login` (Login recruiter)

  - `{ "recruiter_email": "mail@example.com", "recruiter_password": "microsoft" }`
  
- `/recruiter/forgot-password` (Forgot password recruiter)

  - `{ "recruiter_email": "mail@example.com" }`
  
- `/portofolio` (Post portofolio)

  - `{ "user_id": 1, "portofolio_name": "Analyc", "portofolio_image": "preview.jpg", "portofolio_type": 1, "portofolio_repository": "github.com/abc/analyc" }`
  
- `/experience` (Post experience)

  - `{ "user_id": 1, "experience_company": "Bukalapak", "experience_position": "Backend Developer", "experience_date_in": "December 2018", "experience_date_out": "January 2020", "experience_desc": "Lorem, ipsum dolor sit amet consectetur adipisicing, elit. "}`
  
- `/chat` (Post chat)

  - `{ "role": 1, "sender_id": 7, "message_text": "haloo" }`

**3. PATCH**

- `/user/update-password` (Update password worker)

  - `{ "user_key": 101010, "user_password": password123 }`

- `/user/:id` (Update data worker)

  - `{ "user_name": "Selena Gemez", "user_image": "selena.jpg", "user_phone": 08132345678, "user_job_desk": "Devops Engineer", "user_location": "Surabaya, Indonesia", "user_workplace": "Jakarta, Indonesia", "user_about": "Lorem, ipsum dolor sit amet consectetur adipisicing, elit.", "user_instagram": "instagram.com/gemez", "user_github": "github.com/gemez" }`

- `/recruiter/update-password` (Update password recruiter)
  - `{ "recruiter_key": 0000, "recruiter_password": "password123", "recruiter_password_confirmation": "password123" }`
  
- `/recruiter/:id` (Edit data recruiter)
  - `{ "recruiter_profile_image": "preview.jpg", "recruiter_company": "Microsoft Inc.", "recruiter_field": "Software House", "recruiter_location": California, US", "recruiter_about": "Lorem, ipsum dolor sit amet consectetur adipisicing, elit.", "recruiter_email": "example@mail.com", "recruiter_instagram": "instagram.com/microsoft", "recruiter_phone": 08132345678, "recruiter_linkedin": "linkedin.com/microsoft" }`
  
**4. DELETE**

- `/skill/:id` (Delete skill by id)

- `/portofolio/:id` (Delete portofolio by id)

- `/experience/:id` (Delete experience by id)

...
