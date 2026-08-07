// =========================================================
// Topic: Interpolation Syntax in EJS
// File: app.js
// =========================================================

/*
=========================================================
WHAT IS INTERPOLATION SYNTAX?
=========================================================

Interpolation means displaying JavaScript values
inside an EJS page.

EJS uses special tags to insert JavaScript values
into HTML.

The most commonly used tag is:

<%= %>

It prints the value on the webpage.

=========================================================
PROJECT STRUCTURE
=========================================================

project/

│── views/
│     └── index.ejs
│
│── app.js

=========================================================
STEP 1 : INSTALL EJS
=========================================================

npm install ejs

=========================================================
STEP 2 : IMPORT EXPRESS
=========================================================
*/

const express = require("express");

const app = express();

/*
=========================================================
STEP 3 : SET EJS AS VIEW ENGINE
=========================================================
*/

app.set("view engine", "ejs");

/*
=========================================================
STEP 4 : SEND DATA TO EJS
=========================================================

Data is passed as an object.

Syntax:

res.render("filename", {
    key : value
});

*/

app.get("/", (req, res) => {

    res.render("index", {

        name: "Dharmik",
        age: 20,
        city: "Surat",
        marks: 95

    });

});

/*
=========================================================
STEP 5 : START SERVER
=========================================================
*/

app.listen(3000, () => {

    console.log("Server Running at http://localhost:3000");

});

/*
=========================================================
views/index.ejs
=========================================================

<!DOCTYPE html>

<html>

<head>
    <title>EJS Interpolation</title>
</head>

<body>

    <h1>Interpolation Example</h1>

    <h2>Name : <%= name %></h2>

    <h2>Age : <%= age %></h2>

    <h2>City : <%= city %></h2>

    <h2>Marks : <%= marks %></h2>

</body>

</html>

=========================================================
OUTPUT
=========================================================

Browser:

http://localhost:3000/

Output:

Interpolation Example

Name : Dharmik

Age : 20

City : Surat

Marks : 95

=========================================================
COMMON EJS TAGS
=========================================================

<%= value %>

✔ Prints the value on the webpage.

Example:

<%= name %>

Output:

Dharmik

---------------------------------------------------------

<% code %>

✔ Executes JavaScript.
✔ Does NOT print anything.

Example:

<%
let age = 20;
%>

---------------------------------------------------------

<%- value %>

✔ Prints unescaped HTML.

Example:

<%- "<h1>Hello</h1>" %>

Output:

Hello (displayed as an H1 heading)

=========================================================
FLOW
=========================================================

Express Route
       │
       ▼
res.render("index", { data })
       │
       ▼
EJS Receives Data
       │
       ▼
<%= variable %>
       │
       ▼
Value Printed on Webpage

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting to pass data.

Wrong:

res.render("index");

Correct:

res.render("index", {
    name: "Dharmik"
});

---------------------------------------------------------

2. Using the wrong variable name.

Wrong:

<%= username %>

Correct:

<%= name %>

---------------------------------------------------------

3. Forgetting the "=".

Wrong:

<% name %>

Correct:

<%= name %>

=========================================================
INTERVIEW POINTS
=========================================================

✔ Interpolation means displaying JavaScript values
  inside an EJS page.

✔ The syntax for interpolation is:

<%= variable %>

✔ Data is passed from Express using:

res.render("index", { key: value });

✔ EJS replaces the variable with its value
  before sending the HTML to the browser.

=========================================================
*/