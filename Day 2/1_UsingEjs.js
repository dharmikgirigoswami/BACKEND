// =========================================================
// Topic: How to Use EJS in Express.js
// File: app.js
// =========================================================

/*
=========================================================
WHAT IS EJS?
=========================================================

EJS (Embedded JavaScript) is a Template Engine used
with Express.js to create dynamic HTML pages.

Instead of sending plain text using:

res.send("Hello World")

We can render an HTML page using:

res.render("index");

EJS allows us to:

✔ Display dynamic data
✔ Use JavaScript inside HTML
✔ Create reusable templates
✔ Build dynamic websites

=========================================================
STEP 1 : INSTALL EJS
=========================================================

Open Terminal

npm install ejs

=========================================================
STEP 2 : PROJECT STRUCTURE
=========================================================

project/

│── node_modules/
│── views/
│      └── index.ejs
│── app.js
│── package.json

Express automatically looks for EJS files
inside the "views" folder.

=========================================================
STEP 3 : IMPORT EXPRESS
=========================================================
*/

const express = require("express");

// Create Express App
const app = express();

/*
=========================================================
STEP 4 : SET EJS AS VIEW ENGINE
=========================================================

This tells Express to use EJS
for rendering pages.
*/

app.set("view engine", "ejs");

/*
=========================================================
STEP 5 : CREATE ROUTE
=========================================================

res.render("index")

Express will automatically load

views/index.ejs

(No need to write .ejs)
*/

app.get("/", (req, res) => {

    res.render("index");

});

/*
=========================================================
STEP 6 : PASS DATA TO EJS
=========================================================

Data is passed as an object.
*/

app.get("/student", (req, res) => {

    res.render("index", {

        name: "Dharmik",
        age: 20,
        city: "Surat"

    });

});

/*
=========================================================
STEP 7 : START SERVER
=========================================================
*/

app.listen(3000, () => {

    console.log("Server Running at http://localhost:3000");

});

/*
=========================================================
FILE : views/index.ejs
=========================================================

<!DOCTYPE html>
<html>

<head>
    <title>EJS Demo</title>
</head>

<body>

    <h1>Welcome to EJS</h1>

    <h2>Name : <%= name %></h2>

    <h2>Age : <%= age %></h2>

    <h2>City : <%= city %></h2>

</body>

</html>

=========================================================
OUTPUT
=========================================================

URL:

http://localhost:3000/

Output:

Welcome to EJS

---------------------------------------------------------

URL:

http://localhost:3000/student

Output:

Welcome to EJS

Name : Dharmik

Age : 20

City : Surat

=========================================================
COMMON EJS TAGS
=========================================================

<%= value %>

Prints value on the webpage.

--------------------------------------------

<% code %>

Runs JavaScript code but does NOT print it.

--------------------------------------------

<%- value %>

Prints unescaped HTML.

=========================================================
FLOW
=========================================================

Browser
    │
    ▼
Express Route
    │
    ▼
res.render("index")
    │
    ▼
views/index.ejs
    │
    ▼
HTML Generated
    │
    ▼
Browser Displays Page

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting to install EJS

npm install ejs

---------------------------------------------------------

2. Forgetting:

app.set("view engine", "ejs");

---------------------------------------------------------

3. Creating "view" instead of "views"

Correct Folder:

views/

---------------------------------------------------------

4. Using

res.send()

instead of

res.render()

---------------------------------------------------------

5. Writing

res.render("index.ejs")

Correct:

res.render("index")

=========================================================
INTERVIEW POINTS
=========================================================

✔ EJS stands for Embedded JavaScript.

✔ EJS is a template engine used with Express.js.

✔ Express looks for EJS files inside the "views" folder.

✔ app.set("view engine","ejs")
   sets EJS as the default template engine.

✔ res.render() renders an EJS page.

✔ Dynamic data is passed as an object.

=========================================================
*/