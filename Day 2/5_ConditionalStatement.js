// =========================================================
// Topic: Conditional Statements in EJS
// File: app.js
// =========================================================

/*
=========================================================
WHAT ARE CONDITIONAL STATEMENTS?
=========================================================

Conditional statements allow us to display different
content based on a condition.

In EJS, we use normal JavaScript conditions like:

if
if...else
else if

EJS executes JavaScript inside:

<% %>

To print a value, use:

<%= %>

=========================================================
PROJECT STRUCTURE
=========================================================

project/

│── node_modules/
│── views/
│     └── index.ejs
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
STEP 4 : PASS DATA TO EJS
=========================================================

We are sending:

name
age
marks

The EJS page will check conditions
based on these values.
*/

app.get("/", (req, res) => {

    res.render("index", {

        name: "Dharmik",
        age: 20,
        marks: 82

    });

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
    <title>Conditional Statements</title>
</head>

<body>

    <h1>Conditional Statements in EJS</h1>

    <h2>Name : <%= name %></h2>
    <h2>Age : <%= age %></h2>
    <h2>Marks : <%= marks %></h2>

    <hr>

    <!-- Simple if -->

    <% if(age >= 18){ %>

        <h2>You are Eligible to Vote.</h2>

    <% } %>

    <hr>

    <!-- if...else -->

    <% if(marks >= 35){ %>

        <h2>Result : PASS</h2>

    <% } else { %>

        <h2>Result : FAIL</h2>

    <% } %>

    <hr>

    <!-- if...else if...else -->

    <% if(marks >= 90){ %>

        <h2>Grade : A+</h2>

    <% } else if(marks >= 75){ %>

        <h2>Grade : A</h2>

    <% } else if(marks >= 60){ %>

        <h2>Grade : B</h2>

    <% } else if(marks >= 35){ %>

        <h2>Grade : C</h2>

    <% } else { %>

        <h2>Grade : FAIL</h2>

    <% } %>

</body>

</html>

=========================================================
OUTPUT
=========================================================

URL:

http://localhost:3000/

Output:

Conditional Statements in EJS

Name : Dharmik

Age : 20

Marks : 82

You are Eligible to Vote.

Result : PASS

Grade : A

=========================================================
EJS TAGS USED
=========================================================

<% %>

Used to execute JavaScript.

Example:

<% if(age >= 18){ %>

--------------------------------------------

<%= %>

Used to print values.

Example:

<%= name %>

Output:

Dharmik

=========================================================
FLOW
=========================================================

Express

        │

        ▼

Pass Data

res.render("index", {

    age:20,
    marks:82

});

        │

        ▼

EJS receives data

        │

        ▼

Condition is checked

if(age >=18)

        │

        ▼

True

        │

        ▼

Display:

You are Eligible to Vote.

=========================================================
COMMON MISTAKES
=========================================================

1. Printing JavaScript code using

<%= if(age>=18){ } %>

Wrong

---------------------------------------------------------

Correct

<% if(age>=18){ %>

<h2>Eligible</h2>

<% } %>

---------------------------------------------------------

2. Forgetting to close

<% } %>

---------------------------------------------------------

3. Using variables that were not
passed from Express.

=========================================================
INTERVIEW POINTS
=========================================================

✔ EJS supports all JavaScript conditional statements.

✔ JavaScript code is written inside:

<% %>

✔ Values are displayed using:

<%= %>

✔ Common conditional statements:

- if
- if...else
- if...else if...else

=========================================================
*/