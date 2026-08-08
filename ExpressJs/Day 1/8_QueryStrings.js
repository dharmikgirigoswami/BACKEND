// =========================================================
// Topic: Query String in Express.js
// File: app.js
// =========================================================

/*
=========================================================
WHAT IS A QUERY STRING?
=========================================================

A Query String is used to send data to the server
through the URL.

It starts with a question mark (?).

Multiple query parameters are separated using (&).

Unlike Path Parameters, Query Strings are OPTIONAL.

Syntax:

http://localhost:3000/route?key=value

Example:

http://localhost:3000/search?name=Dharmik

Here,
name = key
Dharmik = value

Express stores all query parameters inside:

req.query

=========================================================
*/

// Import Express
const express = require("express");

// Create Express Application
const app = express();

// =========================================================
// Example 1: Single Query Parameter
// URL:
// http://localhost:3000/search?name=Dharmik
// =========================================================

app.get("/search", (req, res) => {

    // Read query parameter
    const name = req.query.name;

    res.send(`Hello ${name}`);

});

// =========================================================
// Example 2: Multiple Query Parameters
// URL:
// http://localhost:3000/student?id=101&name=Dharmik
// =========================================================

app.get("/student", (req, res) => {

    const id = req.query.id;
    const name = req.query.name;

    res.send(`Student ID: ${id}, Name: ${name}`);

});

// =========================================================
// Example 3: Product Details
// URL:
// http://localhost:3000/product?category=mobile&brand=Apple
// =========================================================

app.get("/product", (req, res) => {

    const category = req.query.category;
    const brand = req.query.brand;

    res.send(`Category: ${category}, Brand: ${brand}`);

});

// =========================================================
// Example 4: Login
// URL:
// http://localhost:3000/login?username=admin&password=1234
// (Only for learning. Never send passwords in query strings
// in real applications.)
// =========================================================

app.get("/login", (req, res) => {

    const username = req.query.username;
    const password = req.query.password;

    res.send(`Username: ${username}, Password: ${password}`);

});

// =========================================================
// Example 5: Display Complete Query Object
// URL:
// http://localhost:3000/info?city=Surat&state=Gujarat
// =========================================================

app.get("/info", (req, res) => {

    console.log(req.query);

    res.send("Check the Terminal");

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
http://localhost:3000/search?name=Dharmik

Output:
Hello Dharmik

---------------------------------------------------------

URL:
http://localhost:3000/student?id=101&name=Dharmik

Output:
Student ID: 101, Name: Dharmik

---------------------------------------------------------

URL:
http://localhost:3000/product?category=mobile&brand=Apple

Output:
Category: mobile, Brand: Apple

---------------------------------------------------------

URL:
http://localhost:3000/login?username=admin&password=1234

Output:
Username: admin, Password: 1234

---------------------------------------------------------

URL:
http://localhost:3000/info?city=Surat&state=Gujarat

Terminal Output:

{
    city: 'Surat',
    state: 'Gujarat'
}

=========================================================
HOW req.query WORKS
=========================================================

URL:

http://localhost:3000/student?id=101&name=Dharmik

req.query

{
    id: "101",
    name: "Dharmik"
}

---------------------------------------------------------

URL:

http://localhost:3000/product?category=mobile&brand=Apple

req.query

{
    category: "mobile",
    brand: "Apple"
}

=========================================================
SYNTAX
=========================================================

app.get("/search", (req, res) => {

    const value = req.query.key;

    res.send(value);

});

=========================================================
PATH PARAMETER vs QUERY STRING
=========================================================

Path Parameter

Route:
app.get("/user/:id")

URL:
http://localhost:3000/user/101

Access:
req.params.id

Used For:
Required values (like IDs)

---------------------------------------------------------

Query String

Route:
app.get("/user")

URL:
http://localhost:3000/user?id=101

Access:
req.query.id

Used For:
Optional values (search, filter, sort, pagination)

=========================================================
IMPORTANT POINTS
=========================================================

req.query          -> Object containing all query parameters

req.query.name     -> Access "name"

req.query.id       -> Access "id"

Query parameters are always received as Strings.

Query strings begin with (?).

Multiple query parameters are separated using (&).

=========================================================
COMMON MISTAKES
=========================================================

1. Using req.params instead of req.query.

Wrong:
req.params.name

Correct:
req.query.name

---------------------------------------------------------

2. Forgetting the question mark (?).

Wrong:
http://localhost:3000/searchname=Dharmik

Correct:
http://localhost:3000/search?name=Dharmik

---------------------------------------------------------

3. Forgetting (&) between multiple parameters.

Wrong:
?id=101name=Dharmik

Correct:
?id=101&name=Dharmik

=========================================================
INTERVIEW / EXAM POINTS
=========================================================

✔ Query Strings send data through the URL.

✔ Query Strings start with (?).

✔ Multiple query parameters are separated using (&).

✔ Query parameters are accessed using req.query.

✔ Query parameters are optional and commonly used for
   searching, filtering, sorting, and pagination.

✔ Query parameter values are always strings unless
   converted to another data type.

=========================================================
*/