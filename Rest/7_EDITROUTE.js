/*
===========================================================
TOPIC 07: EDIT ROUTE
===========================================================

The EDIT route is used to display a form that allows the
user to modify an existing resource.

For example:

GET /users/1/edit

This means:

"Show me the edit form for user with ID 1."

IMPORTANT:

EDIT does NOT update the data.

It only displays the form.

The actual update happens through:

PUT /users/:id

or

PATCH /users/:id


===========================================================
1. EDIT vs UPDATE
===========================================================

EDIT
----

Purpose:
Display an edit form.

HTTP Method:
GET

Example:

GET /users/1/edit


UPDATE
------

Purpose:
Actually update the existing resource.

HTTP Method:
PUT or PATCH

Example:

PUT /users/1

or

PATCH /users/1


Remember:

EDIT   = Show the form
UPDATE = Change the data


===========================================================
2. COMPLETE EXAMPLE
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// =========================================================
// MIDDLEWARE
// =========================================================

// Read form data
app.use(express.urlencoded({ extended: true }));

// Read JSON data
app.use(express.json());


// =========================================================
// SAMPLE DATABASE
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
    },

    {
        id: 3,
        name: "Amit",
        age: 22
    }

];


// =========================================================
// INDEX ROUTE
// =========================================================
//
// GET /users
//
// Shows all users.
// =========================================================

app.get("/users", (req, res) => {

    res.json(users);

});


// =========================================================
// SHOW ROUTE
// =========================================================
//
// GET /users/:id
//
// Shows one user.
// =========================================================

app.get("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).json({

            message: "User not found"

        });

    }


    res.json(user);

});


// =========================================================
// EDIT ROUTE
// =========================================================
//
// GET /users/:id/edit
//
// Displays the edit form.
// =========================================================

app.get("/users/:id/edit", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => {

        return user.id === id;

    });


    // Check whether user exists

    if (!user) {

        return res.status(404).send("User not found");

    }


    // Display edit form

    res.send(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>Edit User</title>

        </head>

        <body>

            <h1>Edit User</h1>


            <form action="/users/${user.id}" method="POST">

                <label>Name:</label>

                <input
                    type="text"
                    name="name"
                    value="${user.name}"
                >

                <br><br>


                <label>Age:</label>

                <input
                    type="number"
                    name="age"
                    value="${user.age}"
                >

                <br><br>


                <button type="submit">
                    Update User
                </button>

            </form>

        </body>

        </html>

    `);

});


// =========================================================
// UPDATE ROUTE
// =========================================================
//
// POST /users/:id
//
// For this basic HTML-form example, POST is used because
// normal HTML forms support GET and POST directly.
//
// In REST APIs, PUT/PATCH is commonly used for updating.
// =========================================================

app.post("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).send("User not found");

    }


    user.name = req.body.name;

    user.age = Number(req.body.age);


    res.send(`

        <h1>User Updated Successfully!</h1>

        <p>ID: ${user.id}</p>

        <p>Name: ${user.name}</p>

        <p>Age: ${user.age}</p>

        <br>

        <a href="/users/${user.id}">
            View User
        </a>

    `);

});


// =========================================================
// START SERVER
// =========================================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});


/*
===========================================================
3. TEST THE EDIT ROUTE
===========================================================

Start:

node app.js


Then open:

http://localhost:3000/users/1/edit


You will see:

Edit User

Name:
[ Dharmik ]

Age:
[ 20 ]

[ Update User ]


===========================================================
4. WHAT HAPPENS?
===========================================================

Step 1:

Browser requests:

GET /users/1/edit


        ↓


Step 2:

Express matches:

app.get("/users/:id/edit", ...)


        ↓


Step 3:

Express gets:

req.params.id

Value:

"1"


        ↓


Step 4:

Find user with ID 1.


        ↓


Step 5:

Display the edit form.


        ↓


Step 6:

User changes:

Dharmik

to:

Dharmik Goswami


        ↓


Step 7:

User clicks:

Update User


        ↓


Step 8:

Form sends:

POST /users/1


        ↓


Step 9:

Server updates the user.


===========================================================
5. EDIT ROUTE WITH EJS
===========================================================

In a proper Express application, we usually use EJS
templates instead of putting HTML directly inside
res.send().

Install EJS:

npm install ejs


Set the view engine:

app.set("view engine", "ejs");


Then the edit route becomes:

*/

app.get("/users/:id/edit", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);


    if (!user) {

        return res.status(404).send("User not found");

    }


    res.render("users/edit", {

        user: user

    });

});


/*
===========================================================
6. EJS EDIT PAGE
===========================================================

File:

views/users/edit.ejs

Example:
*/

const editEJS = `

<!DOCTYPE html>

<html>

<head>

    <title>Edit User</title>

</head>

<body>

    <h1>Edit User</h1>


    <form action="/users/<%= user.id %>" method="POST">

        <label>Name:</label>

        <input
            type="text"
            name="name"
            value="<%= user.name %>"
        >


        <br><br>


        <label>Age:</label>

        <input
            type="number"
            name="age"
            value="<%= user.age %>"
        >


        <br><br>


        <button type="submit">
            Update User
        </button>

    </form>

</body>

</html>

`;


/*
===========================================================
7. EDIT ROUTE IN RESOURCE ROUTING
===========================================================

For a complete User resource:

GET /users

    INDEX
    ↓
Show all users


GET /users/new

    NEW
    ↓
Show create form


POST /users

    CREATE
    ↓
Create user


GET /users/:id

    SHOW
    ↓
Show one user


GET /users/:id/edit

    EDIT
    ↓
Show edit form


PUT /users/:id

    UPDATE
    ↓
Update user


DELETE /users/:id

    DESTROY
    ↓
Delete user


===========================================================
8. INDEX, NEW, SHOW, EDIT
===========================================================

INDEX
-----

GET /users

Purpose:

Show all users.


NEW
---

GET /users/new

Purpose:

Show form to create a new user.


SHOW
----

GET /users/1

Purpose:

Show one particular user.


EDIT
----

GET /users/1/edit

Purpose:

Show form to edit user 1.


===========================================================
9. EDIT VS SHOW
===========================================================

SHOW:

GET /users/1

Shows the user's information.

Example:

Name: Dharmik
Age: 20


EDIT:

GET /users/1/edit

Shows a form:

Name: [ Dharmik ]

Age:  [ 20 ]

[ Update User ]


===========================================================
10. EDIT VS CREATE FORM
===========================================================

CREATE FORM:

GET /users/new

Empty fields:

Name: [          ]

Age:  [          ]


EDIT FORM:

GET /users/1/edit

Existing data is already present:

Name: [ Dharmik ]

Age:  [ 20 ]


===========================================================
11. REST API VERSION
===========================================================

In a REST API, the edit page itself may not be needed.

A frontend application can directly send:

PATCH /users/1

Body:

{
    "name": "Dharmik Goswami"
}


The server updates the resource.

The traditional:

GET /users/1/edit

route is especially common in server-rendered web
applications where the server displays HTML forms.


===========================================================
QUICK REVISION
===========================================================

EDIT:

GET /users/:id/edit

        ↓

Display edit form


UPDATE:

PUT /users/:id

or

PATCH /users/:id

        ↓

Update resource


IMPORTANT:

EDIT   = Form
UPDATE = Data


Complete resource routes:

GET     /users
GET     /users/new
POST    /users
GET     /users/:id
GET     /users/:id/edit
PUT     /users/:id
PATCH   /users/:id
DELETE  /users/:id


===========================================================
END OF TOPIC 07
===========================================================
*/