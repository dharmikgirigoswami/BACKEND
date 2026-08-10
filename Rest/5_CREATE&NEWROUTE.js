/*
===========================================================
TOPIC 05: CREATE & NEW ROUTE
===========================================================

In this topic we will learn:

1. What is a CREATE route?
2. What is a NEW route?
3. Difference between CREATE and NEW
4. How they are used in Express.js
5. Practical example

===========================================================
1. CREATE ROUTE
===========================================================

A CREATE route is responsible for creating a new resource.

In a REST API, we normally use:

POST /users

Example:

POST /users

Request Body:

{
    "name": "Dharmik",
    "age": 20
}

The server receives this data and creates a new user.

===========================================================
2. NEW ROUTE
===========================================================

A NEW route is commonly used in web applications to display
a form/page where the user can enter information for creating
a new resource.

For example:

GET /users/new

This route does NOT create the user.

It only displays the form.

The actual creation happens when the form is submitted:

POST /users

So:

GET  /users/new
     ↓
Display form

POST /users
     ↓
Create user

===========================================================
3. CREATE vs NEW
===========================================================

NEW ROUTE
----------

Purpose:
Display a form for creating a new resource.

HTTP Method:
GET

Example:

GET /users/new


CREATE ROUTE
------------

Purpose:
Actually create the resource.

HTTP Method:
POST

Example:

POST /users


===========================================================
4. SIMPLE EXPRESS EXAMPLE
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// Allows Express to read form data
app.use(express.urlencoded({ extended: true }));


// =========================================================
// NEW ROUTE
// =========================================================
//
// GET /users/new
//
// This displays a form.
// =========================================================

app.get("/users/new", (req, res) => {

    res.send(`

        <h1>Create New User</h1>

        <form action="/users" method="POST">

            <label>Name:</label>

            <input
                type="text"
                name="name"
                placeholder="Enter name"
            >

            <br><br>

            <label>Age:</label>

            <input
                type="number"
                name="age"
                placeholder="Enter age"
            >

            <br><br>

            <button type="submit">
                Create User
            </button>

        </form>

    `);

});


// =========================================================
// CREATE ROUTE
// =========================================================
//
// POST /users
//
// This receives the form data and creates a user.
// =========================================================

let users = [];

app.post("/users", (req, res) => {

    const { name, age } = req.body;


    const newUser = {

        id: users.length + 1,

        name: name,

        age: age

    };


    users.push(newUser);


    res.send(`

        <h1>User Created Successfully!</h1>

        <p>ID: ${newUser.id}</p>

        <p>Name: ${newUser.name}</p>

        <p>Age: ${newUser.age}</p>

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
5. HOW THE ABOVE CODE WORKS
===========================================================

Step 1:

Open:

http://localhost:3000/users/new


Step 2:

Express executes:

app.get("/users/new", ...)


Step 3:

The user sees:

Create New User

Name: [          ]

Age:  [          ]

[ Create User ]


Step 4:

User enters:

Name:
Dharmik

Age:
20


Step 5:

User clicks:

Create User


Step 6:

The browser sends:

POST /users


with form data:

name=Dharmik
age=20


Step 7:

Express receives the data:

req.body


Step 8:

A new user is created.


===========================================================
6. REQUEST FLOW
===========================================================

                GET
                ↓
         /users/new
                ↓
        ┌───────────────┐
        │  NEW ROUTE    │
        └───────────────┘
                ↓
          Display Form
                ↓
           User submits
                ↓
               POST
                ↓
            /users
                ↓
        ┌───────────────┐
        │ CREATE ROUTE  │
        └───────────────┘
                ↓
          Create User
                ↓
            Response


===========================================================
7. NEW ROUTE WITH EJS
===========================================================

In real Express applications, we commonly use EJS instead
of writing HTML directly inside res.send().

Install EJS:

npm install ejs


Set EJS as the view engine:

app.set("view engine", "ejs");


Then:

app.get("/users/new", (req, res) => {

    res.render("users/new");

});


The file structure can be:

project/
│
├── app.js
│
├── package.json
│
└── views/
    └── users/
        └── new.ejs


The new.ejs file can contain the form.


===========================================================
8. REST API vs WEB APPLICATION
===========================================================

REST API:

POST /users

Used directly to create data.

Web application:

GET /users/new

Used to show the form.

Then:

POST /users

Used to create the data.


===========================================================
9. IMPORTANT ROUTES TO REMEMBER
===========================================================

For a User resource:

GET     /users
        → Show all users

GET     /users/new
        → Show form for creating a user

POST    /users
        → Create a user

GET     /users/:id
        → Show one user

GET     /users/:id/edit
        → Show edit form

PUT     /users/:id
        → Update user

DELETE  /users/:id
        → Delete user


===========================================================
10. IMPORTANT DIFFERENCE
===========================================================

NEW:

GET /users/new

Meaning:

"Give me a form so I can create a user."


CREATE:

POST /users

Meaning:

"Create this user using the data I am sending."


===========================================================
QUICK REVISION
===========================================================

NEW ROUTE:

GET /users/new

        ↓

Displays creation form.


CREATE ROUTE:

POST /users

        ↓

Creates the resource.


Remember:

NEW    = Show the form
CREATE = Create the data


===========================================================
END OF TOPIC 05
===========================================================
*/