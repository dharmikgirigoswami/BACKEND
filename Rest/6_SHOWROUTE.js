/*
===========================================================
TOPIC 06: SHOW ROUTE
===========================================================

The SHOW route is used to display ONE specific resource.

For example, if we have many users:

/users

A SHOW route displays one particular user:

/users/1
/users/2
/users/3

===========================================================
1. SHOW ROUTE
===========================================================

HTTP METHOD:

GET

ROUTE:

GET /users/:id

Example:

GET /users/1

Meaning:

"Show me the user whose ID is 1."


===========================================================
2. PATH PARAMETER
===========================================================

The :id is a PATH PARAMETER.

Example:

/users/:id

If the request is:

/users/10

Then:

req.params.id

will contain:

"10"

Remember that route parameters are initially strings.


===========================================================
3. BASIC SHOW ROUTE
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// =========================================================
// SAMPLE DATA
// =========================================================

const users = [
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
// SHOW ROUTE
// =========================================================
//
// GET /users/:id
//
// Example:
//
// GET /users/1
//
// =========================================================

app.get("/users/:id", (req, res) => {

    // Get ID from URL

    const id = Number(req.params.id);


    // Find the user

    const user = users.find((user) => {

        return user.id === id;

    });


    // If user doesn't exist

    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }


    // Show the user

    res.status(200).json({

        success: true,

        user: user

    });

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
4. TESTING THE SHOW ROUTE
===========================================================

Start the server:

node app.js


Then open:

http://localhost:3000/users/1


Response:

{
    "success": true,
    "user": {
        "id": 1,
        "name": "Dharmik",
        "age": 20
    }
}


Try:

http://localhost:3000/users/2


Response:

{
    "success": true,
    "user": {
        "id": 2,
        "name": "Rahul",
        "age": 21
    }
}


===========================================================
5. WHAT HAPPENS INTERNALLY?
===========================================================

Request:

GET /users/2

        ↓

Express matches:

app.get("/users/:id", ...)

        ↓

req.params.id

        ↓

"2"

        ↓

Convert string to number:

Number("2")

        ↓

2

        ↓

Find user:

users.find(...)

        ↓

Return user

        ↓

JSON response


===========================================================
6. SHOW ROUTE WITH HTML
===========================================================

Instead of returning JSON, we can display HTML.

Example:
*/

app.get("/profile/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);


    if (!user) {

        return res.status(404).send("User not found");

    }


    res.send(`

        <h1>User Profile</h1>

        <h2>${user.name}</h2>

        <p>ID: ${user.id}</p>

        <p>Age: ${user.age}</p>

    `);

});


/*
===========================================================
7. SHOW ROUTE WITH EJS
===========================================================

In a real Express application, we can use EJS.

Example:

app.get("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).send("User not found");
    }

    res.render("users/show", {
        user: user
    });

});


File structure:

project/
│
├── app.js
│
├── package.json
│
└── views/
    └── users/
        └── show.ejs


===========================================================
8. show.ejs
===========================================================

Example EJS file:

*/

const showPageExample = `

<h1>User Details</h1>

<h2><%= user.name %></h2>

<p>ID: <%= user.id %></p>

<p>Age: <%= user.age %></p>

`;


/*
===========================================================
9. SHOW ROUTE IN RESOURCE ROUTING
===========================================================

For a User resource:

GET /users

        ↓

INDEX

Show all users


GET /users/new

        ↓

NEW

Show form to create user


POST /users

        ↓

CREATE

Create user


GET /users/:id

        ↓

SHOW

Show one user


===========================================================
10. INDEX VS SHOW
===========================================================

INDEX:

GET /users

Returns:

ALL USERS


SHOW:

GET /users/1

Returns:

ONE USER


Example:

INDEX:

[
    {
        id: 1,
        name: "Dharmik"
    },

    {
        id: 2,
        name: "Rahul"
    }
]


SHOW:

{
    id: 1,
    name: "Dharmik"
}


===========================================================
11. SHOW ROUTE WITH PRODUCTS
===========================================================

The same concept works with any resource.

Example:

GET /products/10

GET /students/5

GET /courses/20

GET /orders/100


Code:
*/

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    },

    {
        id: 2,
        name: "Mouse",
        price: 800
    }
];


app.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find((product) => {

        return product.id === id;

    });


    if (!product) {

        return res.status(404).json({

            message: "Product not found"

        });

    }


    res.json(product);

});


/*
===========================================================
12. IMPORTANT: 404 RESPONSE
===========================================================

Suppose the user requests:

GET /users/100

But user 100 doesn't exist.

We should NOT return an empty or incorrect user.

Instead:

Status:

404 Not Found

Response:

{
    "success": false,
    "message": "User not found"
}


===========================================================
13. COMPLETE RESOURCE ROUTES
===========================================================

USER RESOURCE:

GET /users

    → INDEX
    → Show all users


GET /users/new

    → NEW
    → Show create form


POST /users

    → CREATE
    → Create a user


GET /users/:id

    → SHOW
    → Show one user


GET /users/:id/edit

    → EDIT
    → Show edit form


PUT /users/:id

    → UPDATE
    → Update user


DELETE /users/:id

    → DESTROY
    → Delete user


===========================================================
14. MOST IMPORTANT CONCEPT
===========================================================

SHOW means:

"Show me ONE particular resource."


Example:

GET /users/5

        ↓

:id = 5

        ↓

Find user with ID 5

        ↓

Return that user


===========================================================
QUICK REVISION
===========================================================

SHOW ROUTE:

GET /users/:id


Example:

GET /users/1


Code:

app.get("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    // Find resource using id

});


INDEX:

GET /users

→ All users


SHOW:

GET /users/1

→ One user


NEW:

GET /users/new

→ Create form


CREATE:

POST /users

→ Create resource


===========================================================
END OF TOPIC 06
===========================================================
*/