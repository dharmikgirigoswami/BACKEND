// =========================================================
// Topic: Loops and Include in EJS
// File: app.js
// =========================================================

/*
=========================================================
WHAT ARE LOOPS IN EJS?
=========================================================

Loops are used to display repeated data such as:

✔ Student List
✔ Product List
✔ Employee List
✔ Menu Items

EJS supports all JavaScript loops such as:

1. for
2. for...of
3. forEach()

The most commonly used loop in EJS is:

forEach()

=========================================================
WHAT IS INCLUDE IN EJS?
=========================================================

Include allows us to reuse the same EJS file
in multiple pages.

Example:

Header
Navbar
Footer
Sidebar

Instead of writing the same code again and again,
we create one file and include it wherever needed.

Syntax:

<%- include("filename") %>

=========================================================
PROJECT STRUCTURE
=========================================================

project/

│── node_modules/
│── views/
│     ├── index.ejs
│     ├── header.ejs
│     └── footer.ejs
│
│── app.js
│── package.json

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
STEP 3 : SET VIEW ENGINE
=========================================================
*/

app.set("view engine", "ejs");

/*
=========================================================
STEP 4 : SEND ARRAY TO EJS
=========================================================
*/

app.get("/", (req, res) => {

    const students = [
        "Dharmik",
        "Rahul",
        "Amit",
        "Karan",
        "Rohit"
    ];

    res.render("index", { students });

});

/*
=========================================================
START SERVER
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
    <title>Loops and Include</title>
</head>

<body>

    <!-- Include Header -->

    <%- include("header") %>

    <h1>Student List</h1>

    <hr>

    <!-- forEach Loop -->

    <% students.forEach(student => { %>

        <h3><%= student %></h3>

    <% }) %>

    <hr>

    <!-- for Loop -->

    <% for(let i=0; i<students.length; i++){ %>

        <p><%= students[i] %></p>

    <% } %>

    <hr>

    <!-- for...of Loop -->

    <% for(let student of students){ %>

        <p><%= student %></p>

    <% } %>

    <hr>

    <!-- Include Footer -->

    <%- include("footer") %>

</body>

</html>

=========================================================
views/header.ejs
=========================================================

<header>

<h2>Welcome to My Website</h2>

<hr>

</header>

=========================================================
views/footer.ejs
=========================================================

<hr>

<footer>

<h3>Copyright © 2026</h3>

</footer>

=========================================================
OUTPUT
=========================================================

Welcome to My Website

-----------------------------------

Student List

Dharmik

Rahul

Amit

Karan

Rohit

-----------------------------------

Copyright © 2026

=========================================================
LOOP SYNTAX
=========================================================

1. forEach()

<% students.forEach(student => { %>

    <%= student %>

<% }) %>

---------------------------------------------------------

2. for Loop

<% for(let i=0;i<students.length;i++){ %>

    <%= students[i] %>

<% } %>

---------------------------------------------------------

3. for...of Loop

<% for(let student of students){ %>

    <%= student %>

<% } %>

=========================================================
INCLUDE SYNTAX
=========================================================

Include Header

<%- include("header") %>

-----------------------------------------

Include Footer

<%- include("footer") %>

=========================================================
FLOW
=========================================================

Express

        │

        ▼

Pass Array

students[]

        │

        ▼

EJS Receives Data

        │

        ▼

Loop Executes

        │

        ▼

Each Student Printed

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting

<% } %>

to close the loop.

---------------------------------------------------------

2. Using

<%= include("header") %>

Wrong

Correct

<%- include("header") %>

---------------------------------------------------------

3. Passing incorrect array name.

Express:

students

EJS:

studentList

Wrong

=========================================================
INTERVIEW POINTS
=========================================================

✔ EJS supports all JavaScript loops.

✔ Most commonly used loop is forEach().

✔ Include is used to reuse EJS files.

✔ Include syntax:

<%- include("filename") %>

✔ Common reusable files:

Header
Footer
Navbar
Sidebar

=========================================================
*/