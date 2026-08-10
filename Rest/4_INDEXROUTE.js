/*
===========================================================
TOPIC 04: INDEX ROUTE
===========================================================

An INDEX ROUTE is the main/root route of an application.

In Express.js, the index route is commonly:

GET /

The "/" represents the root URL.

Example:

http://localhost:3000/

When a user visits this URL, Express executes the
function associated with the "/" route.


===========================================================
1. BASIC INDEX ROUTE
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// Index Route
app.get("/", (req, res) => {

    res.send("Welcome to my website!");

});


app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});


/*
===========================================================
2. HOW IT WORKS
===========================================================

Browser sends:

GET /

        ↓

Express receives the request

        ↓

Express finds:

app.get("/", ...)

        ↓

Callback function executes

        ↓

Response:

"Welcome to my website!"


===========================================================
3. INDEX ROUTE WITH HTML
===========================================================

We can also send HTML from the index route.
*/

app.get("/home", (req, res) => {

    res.send(`
        
        <h1>Welcome to My Website</h1>

        <p>This is the home page.</p>

        <button>Get Started</button>

    `);

});


/*
===========================================================
4. INDEX ROUTE WITH JSON
===========================================================

For REST APIs, we usually return JSON.
*/

app.get("/api", (req, res) => {

    res.json({

        message: "Welcome to my REST API",

        status: "success"

    });

});


/*
===========================================================
5. INDEX ROUTE WITH DATA
===========================================================
*/

const user = {

    name: "Dharmik",

    age: 20,

    course: "B.Tech CSE"

};


app.get("/profile", (req, res) => {

    res.json({

        message: "User Profile",

        user: user

    });

});


/*
===========================================================
6. INDEX ROUTE VS OTHER ROUTES
===========================================================

INDEX / ROOT ROUTE:

GET /

Usually represents the main/home page.


OTHER ROUTES:

GET /users
GET /products
GET /about
GET /contact


Example:

app.get("/", ...)
app.get("/users", ...)
app.get("/products", ...)
app.get("/about", ...)


===========================================================
7. COMPLETE EXAMPLE
===========================================================
*/

const express2 = require("express");

const server = express2();


// =========================================================
// INDEX ROUTE
// =========================================================

server.get("/", (req, res) => {

    res.send("This is the Index Route");

});


// =========================================================
// ABOUT ROUTE
// =========================================================

server.get("/about", (req, res) => {

    res.send("This is the About Page");

});


// =========================================================
// USERS ROUTE
// =========================================================

server.get("/users", (req, res) => {

    res.json({

        users: [

            {
                id: 1,
                name: "Dharmik"
            },

            {
                id: 2,
                name: "Rahul"
            }

        ]

    });

});


// =========================================================
// PRODUCTS ROUTE
// =========================================================

server.get("/products", (req, res) => {

    res.json({

        products: [

            {
                id: 1,
                name: "Laptop"
            },

            {
                id: 2,
                name: "Mouse"
            }

        ]

    });

});


// =========================================================
// START SERVER
// =========================================================

server.listen(4000, () => {

    console.log("Server running on port 4000");

});


/*
===========================================================
8. IMPORTANT POINT
===========================================================

"/" is the ROOT PATH.

Therefore:

app.get("/", callback)

is commonly called the:

INDEX ROUTE
or
ROOT ROUTE


Example:

http://localhost:3000/

Path:

/


Example:

http://localhost:3000/about

Path:

/about


Example:

http://localhost:3000/products

Path:

/products


===========================================================
9. REQUEST AND RESPONSE
===========================================================

The index route receives two important objects:

req
---
Request from the client.

res
---
Response that the server sends back.


Example:
*/

server.get("/", (req, res) => {

    console.log(req.method);

    console.log(req.url);

    res.send("Hello from Index Route");

});


/*
===========================================================
10. INDEX ROUTE IN A REST API
===========================================================

For a REST API, "/" can be used as the API entry point.

Example:

GET /

Response:

{
    "message": "API is running"
}


Code:
*/

server.get("/", (req, res) => {

    res.status(200).json({

        message: "API is running",

        status: "success"

    });

});


/*
===========================================================
QUICK REVISION
===========================================================

INDEX ROUTE:

GET /

Express code:

app.get("/", (req, res) => {

    res.send("Home Page");

});


"/"
 ↓
Root URL
 ↓
Main/Index Route


Examples:

GET /
GET /about
GET /users
GET /products


INDEX ROUTE:

    /
    ↓
Main entry point of the application


===========================================================
END OF TOPIC 04
===========================================================
*/