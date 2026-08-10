/*
===========================================================
TOPIC 02: CRUD OPERATIONS
===========================================================

CRUD =

C -> Create
R -> Read
U -> Update
D -> Delete

CRUD is one of the most important concepts when working
with REST APIs and databases.

===========================================================
1. CRUD AND HTTP METHODS
===========================================================

CRUD operations are commonly mapped to HTTP methods:

CREATE  -> POST
READ    -> GET
UPDATE  -> PUT / PATCH
DELETE  -> DELETE


Example resource:

/users


CREATE
------
POST /users


READ
----
GET /users
GET /users/1


UPDATE
------
PUT /users/1
PATCH /users/1


DELETE
------
DELETE /users/1


===========================================================
2. BASIC CRUD FLOW
===========================================================

Client
   |
   | HTTP Request
   ↓
Express.js
   |
   | CRUD Operation
   ↓
Database
   |
   | Result
   ↓
Express.js
   |
   | JSON Response
   ↓
Client


===========================================================
3. CREATE OPERATION
===========================================================

CREATE means adding new data.

HTTP method:

POST

Example:

POST /users

Request body:

{
    "name": "Dharmik",
    "age": 20
}

The server receives the data and stores it.


===========================================================
4. READ OPERATION
===========================================================

READ means retrieving existing data.

HTTP method:

GET

Get all users:

GET /users

Get one user:

GET /users/1


===========================================================
5. UPDATE OPERATION
===========================================================

UPDATE means changing existing data.

PUT:
    Usually replaces the complete resource.

PATCH:
    Usually changes only selected fields.

Examples:

PUT /users/1

PATCH /users/1


===========================================================
6. DELETE OPERATION
===========================================================

DELETE removes existing data.

Example:

DELETE /users/1


===========================================================
7. COMPLETE CRUD EXAMPLE
===========================================================

Install Express:

npm init -y
npm install express

Create:

app.js
*/

const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read JSON request bodies
app.use(express.json());


// =========================================================
// TEMPORARY DATA
// =========================================================

let users = [
    {
        id: 1,
        name: "Dharmik",
        age: 20
    },
    {
        id: 2,
        name: "Rahul",
        age: 21
    }
];


// =========================================================
// CREATE
// POST /users
// =========================================================

app.post("/users", (req, res) => {

    const { name, age } = req.body;

    const newUser = {
        id: users.length + 1,
        name: name,
        age: age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});


// =========================================================
// READ ALL
// GET /users
// =========================================================

app.get("/users", (req, res) => {

    res.json(users);
});


// =========================================================
// READ ONE
// GET /users/:id
// =========================================================

app.get("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});


// =========================================================
// UPDATE
// PUT /users/:id
// =========================================================

app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;
    user.age = req.body.age;

    res.json({
        message: "User updated successfully",
        user: user
    });
});


// =========================================================
// PARTIAL UPDATE
// PATCH /users/:id
// =========================================================

app.patch("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Update only the fields that were provided

    if (req.body.name !== undefined) {
        user.name = req.body.name;
    }

    if (req.body.age !== undefined) {
        user.age = req.body.age;
    }

    res.json({
        message: "User partially updated",
        user: user
    });
});


// =========================================================
// DELETE
// DELETE /users/:id
// =========================================================

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const userExists = users.some((user) => user.id === id);

    if (!userExists) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter((user) => user.id !== id);

    res.json({
        message: "User deleted successfully"
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
8. TESTING THE CRUD API
===========================================================

You can test these APIs using:

Postman
Thunder Client
Insomnia


-----------------------------------------------------------
CREATE
-----------------------------------------------------------

POST

http://localhost:3000/users

Body → JSON:

{
    "name": "Amit",
    "age": 22
}


-----------------------------------------------------------
READ ALL
-----------------------------------------------------------

GET

http://localhost:3000/users


-----------------------------------------------------------
READ ONE
-----------------------------------------------------------

GET

http://localhost:3000/users/1


-----------------------------------------------------------
UPDATE
-----------------------------------------------------------

PUT

http://localhost:3000/users/1

Body:

{
    "name": "Dharmik Updated",
    "age": 21
}


-----------------------------------------------------------
PARTIAL UPDATE
-----------------------------------------------------------

PATCH

http://localhost:3000/users/1

Body:

{
    "name": "New Name"
}


Only the name is changed.


-----------------------------------------------------------
DELETE
-----------------------------------------------------------

DELETE

http://localhost:3000/users/1


===========================================================
9. CRUD TABLE
===========================================================

Operation      HTTP Method      Endpoint

Create         POST             /users
Read           GET              /users
Read One       GET              /users/:id
Update         PUT              /users/:id
Partial Update PATCH            /users/:id
Delete         DELETE           /users/:id


===========================================================
10. IMPORTANT DIFFERENCE: PUT VS PATCH
===========================================================

PUT
---
Used when you want to replace/update the complete resource.

Example:

PUT /users/1

{
    "name": "Dharmik",
    "age": 21
}


PATCH
-----
Used when you want to change only part of the resource.

Example:

PATCH /users/1

{
    "age": 21
}


===========================================================
11. CRUD IN A REAL APPLICATION
===========================================================

For example, imagine a student management application.

CREATE
    Add a student

READ
    Display students

UPDATE
    Change student information

DELETE
    Remove a student


The complete flow can be:

Frontend
    ↓
REST API
    ↓
Express.js
    ↓
MongoDB
    ↓
Express.js
    ↓
JSON Response
    ↓
Frontend


===========================================================
12. IMPORTANT NOTE
===========================================================

In this example, we are using an array:

let users = [];

This is only for learning CRUD.

When the server restarts, the data will be lost.

In a real application, we normally use a database such
as MongoDB.

Later, when you learn MongoDB, the same CRUD operations
will work with actual database data.


===========================================================
QUICK REVISION
===========================================================

CRUD means:

C → CREATE → POST
R → READ   → GET
U → UPDATE → PUT / PATCH
D → DELETE → DELETE


Example:

POST   /users
GET    /users
GET    /users/1
PUT    /users/1
PATCH  /users/1
DELETE /users/1


===========================================================
END OF TOPIC 02
===========================================================
*/