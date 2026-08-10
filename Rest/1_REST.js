/*
===========================================================
TOPIC 01: WHAT IS REST?
===========================================================

REST = Representational State Transfer

REST is an architectural style used to design APIs that
allow applications to communicate with each other over HTTP.

For example:

Frontend  <------HTTP------>  Backend
React                         Node.js
                              Express.js

The frontend can send a request to the backend, and the
backend sends a response.

===========================================================
1. WHAT IS AN API?
===========================================================

API = Application Programming Interface

An API provides a way for two applications to communicate.

Example:

A frontend wants information about a user.

Frontend:
    GET /users/101

Backend:
    {
        "id": 101,
        "name": "Dharmik"
    }

===========================================================
2. WHAT IS A REST API?
===========================================================

A REST API is an API designed according to REST principles.

REST APIs commonly use HTTP methods:

GET     -> Read data
POST    -> Create data
PUT     -> Replace/update data
PATCH   -> Partially update data
DELETE  -> Delete data

===========================================================
3. REST USES RESOURCES
===========================================================

In REST, data is treated as a RESOURCE.

Examples:

/users
/products
/orders
/students
/courses

Individual resources can be identified using IDs:

/users/101
/products/25
/orders/500

===========================================================
4. HTTP METHODS
===========================================================

GET
----
Used to retrieve data.

GET /users

GET /users/101


POST
-----
Used to create new data.

POST /users


PUT
----
Used to completely update/replace existing data.

PUT /users/101


PATCH
-----
Used to partially update existing data.

PATCH /users/101


DELETE
------
Used to delete data.

DELETE /users/101

===========================================================
5. SIMPLE REST API USING EXPRESS.JS
===========================================================

Install Express first:

npm init -y
npm install express

Create:

app.js
*/

const express = require("express");

const app = express();

const PORT = 3000;

// Allows Express to read JSON data sent in requests
app.use(express.json());


// =========================================================
// GET - Get all users
// =========================================================

app.get("/users", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Dharmik"
        },
        {
            id: 2,
            name: "Rahul"
        }
    ]);
});


// =========================================================
// GET - Get one user
// =========================================================

app.get("/users/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        id: id,
        name: "Dharmik"
    });
});


// =========================================================
// POST - Create a new user
// =========================================================

app.post("/users", (req, res) => {

    const user = req.body;

    res.status(201).json({
        message: "User created successfully",
        user: user
    });
});


// =========================================================
// PUT - Update a user
// =========================================================

app.put("/users/:id", (req, res) => {

    const id = req.params.id;
    const updatedUser = req.body;

    res.json({
        message: "User updated successfully",
        id: id,
        user: updatedUser
    });
});


// =========================================================
// PATCH - Partially update a user
// =========================================================

app.patch("/users/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        message: "User partially updated",
        id: id,
        changes: req.body
    });
});


// =========================================================
// DELETE - Delete a user
// =========================================================

app.delete("/users/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        message: "User deleted successfully",
        id: id
    });
});


// =========================================================
// START SERVER
// =========================================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


/*
===========================================================
6. REST API REQUEST EXAMPLES
===========================================================

GET
http://localhost:3000/users

Returns:

[
    {
        "id": 1,
        "name": "Dharmik"
    },
    {
        "id": 2,
        "name": "Rahul"
    }
]


GET
http://localhost:3000/users/1

Returns:

{
    "id": "1",
    "name": "Dharmik"
}


POST
http://localhost:3000/users

Request Body:

{
    "name": "Amit"
}

Response:

{
    "message": "User created successfully",
    "user": {
        "name": "Amit"
    }
}


PUT
http://localhost:3000/users/1

Request Body:

{
    "name": "New Name"
}


PATCH
http://localhost:3000/users/1

Request Body:

{
    "name": "Updated Name"
}


DELETE
http://localhost:3000/users/1


===========================================================
7. IMPORTANT REST CONCEPT
===========================================================

REST focuses on RESOURCES rather than actions.

❌ Less REST-like:

GET /getUsers
GET /getUserById/10
POST /createUser
POST /deleteUser


✅ REST-style:

GET    /users
GET    /users/10
POST   /users
DELETE /users/10


The HTTP method tells us what operation we want to perform.


===========================================================
8. REST API FLOW
===========================================================

Client
   |
   | GET /users
   ↓
Express Server
   |
   | Process Request
   ↓
Database
   |
   | User Data
   ↓
Express Server
   |
   | JSON Response
   ↓
Client


===========================================================
9. QUICK SUMMARY
===========================================================

REST
 ↓
Architectural style for designing APIs
 ↓
Uses HTTP
 ↓
Works with resources
 ↓
Uses HTTP methods
 ↓
Usually sends JSON data

HTTP METHODS:

GET     → Read
POST    → Create
PUT     → Replace/Update
PATCH   → Partial Update
DELETE  → Delete

RESOURCE EXAMPLES:

/users
/products
/orders
/students

INDIVIDUAL RESOURCE:

/users/101
/products/25
/orders/500

===========================================================
END OF TOPIC 01
===========================================================
*/