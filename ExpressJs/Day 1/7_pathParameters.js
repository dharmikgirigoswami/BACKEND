// =========================================================
// Topic: Path Parameters in Express.js
// File: app.js
// =========================================================

/*
=========================================================
WHAT ARE PATH PARAMETERS?
=========================================================

Path Parameters are dynamic values present in the URL.

They allow us to send different values through the URL
without creating multiple routes.

A path parameter starts with a colon (:)

Syntax:

app.get("/route/:parameter", (req, res) => {
    // Access using req.params.parameter
});

Example URL:
http://localhost:3000/user/101

Here,
101 is the value of the path parameter.

=========================================================
*/

// Import Express
const express = require("express");

// Create Express Application
const app = express();

// =========================================================
// Example 1: Single Path Parameter
// URL: http://localhost:3000/user/101
// =========================================================

app.get("/user/:id", (req, res) => {

    // Get path parameter
    const userId = req.params.id;

    res.send(`User ID is ${userId}`);

});

// =========================================================
// Example 2: Product Parameter
// URL: http://localhost:3000/product/500
// =========================================================

app.get("/product/:productId", (req, res) => {

    const productId = req.params.productId;

    res.send(`Product ID is ${productId}`);

});

// =========================================================
// Example 3: Multiple Path Parameters
// URL:
// http://localhost:3000/student/101/Dharmik
// =========================================================

app.get("/student/:id/:name", (req, res) => {

    const id = req.params.id;
    const name = req.params.name;

    res.send(`Student ID: ${id}, Name: ${name}`);

});

// =========================================================
// Example 4: Book Information
// URL:
// http://localhost:3000/book/10/page/25
// =========================================================

app.get("/book/:bookId/page/:pageNo", (req, res) => {

    const bookId = req.params.bookId;
    const pageNo = req.params.pageNo;

    res.send(`Book ID: ${bookId}, Page No: ${pageNo}`);

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

URL:
http://localhost:3000/user/101

Output:
User ID is 101

---------------------------------------------------------

URL:
http://localhost:3000/product/500

Output:
Product ID is 500

---------------------------------------------------------

URL:
http://localhost:3000/student/101/Dharmik

Output:
Student ID: 101, Name: Dharmik

---------------------------------------------------------

URL:
http://localhost:3000/book/10/page/25

Output:
Book ID: 10, Page No: 25

=========================================================
HOW req.params WORKS
=========================================================

Route:
app.get("/user/:id", ...)

URL:
http://localhost:3000/user/101

req.params

{
    id: "101"
}

--------------------------------------------

Route:
app.get("/student/:id/:name", ...)

URL:
http://localhost:3000/student/101/Dharmik

req.params

{
    id: "101",
    name: "Dharmik"
}

=========================================================
SYNTAX
=========================================================

app.get("/user/:id", (req, res) => {

    const id = req.params.id;

    res.send(id);

});

=========================================================
IMPORTANT POINTS
=========================================================

:parameterName      -> Declares a path parameter

req.params          -> Object containing all path parameters

req.params.id       -> Access "id"

req.params.name     -> Access "name"

Path parameters are always received as Strings.

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting the colon (:)

Wrong:
app.get("/user/id", ...)

Correct:
app.get("/user/:id", ...)

---------------------------------------------------------

2. Using req.param instead of req.params

Wrong:
req.param.id

Correct:
req.params.id

---------------------------------------------------------

3. Using the wrong parameter name

Route:
"/user/:id"

Correct:
req.params.id

Wrong:
req.params.userId

=========================================================
INTERVIEW / EXAM POINTS
=========================================================

✔ Path Parameters are dynamic values passed in the URL.

✔ They are defined using a colon (:).

✔ They are accessed using req.params.

✔ Multiple path parameters can be used in one route.

✔ Path parameters are always strings unless converted.

=========================================================
*/