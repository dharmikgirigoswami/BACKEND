// =========================================================
// Topic: Routing in Express.js
// File: app.js
// =========================================================

/*
=========================================================
WHAT IS ROUTING?
=========================================================

Routing is the process of defining how an application
responds to a client's request for a specific URL (Route)
and HTTP Method (GET, POST, PUT, DELETE).

In simple words:

Routing tells Express:
"If the user visits this URL, execute this function."

Syntax:

app.METHOD(PATH, CALLBACK)

METHOD   -> HTTP Method (GET, POST, PUT, DELETE, etc.)
PATH     -> URL Path
CALLBACK -> Function executed when the route is matched

=========================================================
*/

// Import Express
const express = require("express");

// Create Express Application
const app = express();

// =========================================================
// HOME ROUTE
// URL: http://localhost:3000/
// =========================================================

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

// =========================================================
// ABOUT ROUTE
// URL: http://localhost:3000/about
// =========================================================

app.get("/about", (req, res) => {
    res.send("Welcome to About Page");
});

// =========================================================
// CONTACT ROUTE
// URL: http://localhost:3000/contact
// =========================================================

app.get("/contact", (req, res) => {
    res.send("Welcome to Contact Page");
});

// =========================================================
// LOGIN ROUTE
// URL: http://localhost:3000/login
// =========================================================

app.get("/login", (req, res) => {
    res.send("Login Page");
});

// =========================================================
// REGISTER ROUTE
// URL: http://localhost:3000/register
// =========================================================

app.get("/register", (req, res) => {
    res.send("Register Page");
});

// =========================================================
// POST ROUTE
// URL: http://localhost:3000/user
// Used to create new data
// Test using Postman or Thunder Client
// =========================================================

app.post("/user", (req, res) => {
    res.send("New User Created");
});

// =========================================================
// PUT ROUTE
// URL: http://localhost:3000/user
// Used to update existing data
// =========================================================

app.put("/user", (req, res) => {
    res.send("User Updated");
});

// =========================================================
// DELETE ROUTE
// URL: http://localhost:3000/user
// Used to delete data
// =========================================================

app.delete("/user", (req, res) => {
    res.send("User Deleted");
});

// =========================================================
// Start Server
// =========================================================

app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});

/*
=========================================================
OUTPUT
=========================================================

GET  /
-------------------------
Welcome to Home Page

GET  /about
-------------------------
Welcome to About Page

GET  /contact
-------------------------
Welcome to Contact Page

GET  /login
-------------------------
Login Page

GET  /register
-------------------------
Register Page

POST /user
-------------------------
New User Created

PUT /user
-------------------------
User Updated

DELETE /user
-------------------------
User Deleted

=========================================================
ROUTING FLOW
=========================================================

Browser/Postman
       │
       ▼
Request URL
       │
       ▼
Express checks all routes
       │
       ▼
Matching route found
       │
       ▼
Callback Function Executes
       │
       ▼
Response sent to Client

=========================================================
SYNTAX
=========================================================

app.get("/path", (req, res) => {
    res.send("Response");
});

app.post("/path", (req, res) => {
    res.send("Response");
});

app.put("/path", (req, res) => {
    res.send("Response");
});

app.delete("/path", (req, res) => {
    res.send("Response");
});

=========================================================
COMMON HTTP METHODS
=========================================================

GET     -> Read/Get Data
POST    -> Create New Data
PUT     -> Update Existing Data
DELETE  -> Delete Data

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting the "/" before the route path.

   Wrong:
   app.get("about", ...)

   Correct:
   app.get("/about", ...)

2. Defining two routes with the same method and path.

3. Forgetting to send a response using res.send().

4. Trying to access POST, PUT, or DELETE routes
   directly from the browser address bar.
   The browser only sends GET requests.

=========================================================
INTERVIEW / EXAM POINTS
=========================================================

✔ Routing determines how the server responds to a client request.

✔ A route consists of:
   - HTTP Method
   - URL Path
   - Callback Function

✔ Syntax:
   app.METHOD(PATH, CALLBACK)

✔ Express matches the requested URL with the
   defined route and executes the corresponding
   callback function.

=========================================================
*/