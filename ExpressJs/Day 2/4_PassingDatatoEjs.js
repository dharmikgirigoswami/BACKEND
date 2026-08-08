// =========================================================
// Topic: Passing Data to EJS
// File: app.js
// =========================================================

/*
=========================================================
WHAT IS PASSING DATA TO EJS?
=========================================================

Passing Data means sending values from the Express
server to an EJS page.

The data is sent using:

res.render("filename", { data });

The second argument of res.render() is an object
that contains the data to be sent.

The EJS file receives this data and displays it
using:

<%= variable %>

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
STEP 3 : SET EJS AS VIEW ENGINE
=========================================================
*/

app.set("view engine", "ejs");

/*
=========================================================
STEP 4 : PASS DATA TO EJS
=========================================================

Syntax:

res.render("index", {
    key : value
});

Everything inside the object becomes available
inside index.ejs.
*/

app.get("/", (req, res) => {

    res.render("index", {

        name: "Dharmik",
        age: 20,
        city: "Surat",
        college: "P P Savani University",
        course: "B.Tech CSE",
        marks: 92

    });

});

/*
=========================================================
STEP 5 : PASS ARRAY
=========================================================
*/

app.get("/students", (req, res) => {

    const students = [
        "Dharmik",
        "Rahul",
        "Amit",
        "Karan"
    ];

    res.render("index", { students });

});

/*
=========================================================
STEP 6 : PASS OBJECT
=========================================================
*/

app.get("/profile", (req, res) => {

    const student = {

        id: 101,
        name: "Dharmik",
        city: "Surat",
        branch: "Computer Engineering"

    };

    res.render("index", { student });

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
    <title>Passing Data</title>
</head>

<body>

    <h1>Passing Data to EJS</h1>

    <h2>Name : <%= name %></h2>

    <h2>Age : <%= age %></h2>

    <h2>City : <%= city %></h2>

    <h2>College : <%= college %></h2>

    <h2>Course : <%= course %></h2>

    <h2>Marks : <%= marks %></h2>

    <hr>

    <h2>Students</h2>

    <% if(typeof students !== "undefined"){ %>

        <% students.forEach(student => { %>

            <p><%= student %></p>

        <% }) %>

    <% } %>

    <hr>

    <% if(typeof student !== "undefined"){ %>

        <h2>Student Object</h2>

        <p>ID : <%= student.id %></p>

        <p>Name : <%= student.name %></p>

        <p>City : <%= student.city %></p>

        <p>Branch : <%= student.branch %></p>

    <% } %>

</body>

</html>

=========================================================
OUTPUT
=========================================================

URL:
http://localhost:3000/

Output:

Passing Data to EJS

Name : Dharmik
Age : 20
City : Surat
College : P P Savani University
Course : B.Tech CSE
Marks : 92

---------------------------------------------------------

URL:
http://localhost:3000/students

Output:

Dharmik
Rahul
Amit
Karan

---------------------------------------------------------

URL:
http://localhost:3000/profile

Output:

ID : 101
Name : Dharmik
City : Surat
Branch : Computer Engineering

=========================================================
HOW DATA IS PASSED
=========================================================

Express

res.render("index", {
    name : "Dharmik"
});

            │
            ▼

EJS

<%= name %>

            │
            ▼

Browser

Dharmik

=========================================================
IMPORTANT POINTS
=========================================================

✔ res.render() renders an EJS page.

✔ The second parameter of res.render()
  is an object.

✔ Object properties become variables
  inside the EJS file.

✔ You can pass:

- String
- Number
- Boolean
- Array
- Object

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting to set the view engine.

app.set("view engine","ejs");

---------------------------------------------------------

2. Forgetting to pass an object.

Wrong:

res.render("index");

Correct:

res.render("index", {
    name: "Dharmik"
});

---------------------------------------------------------

3. Using the wrong variable name.

Express:

name

EJS:

<%= username %>

Correct:

<%= name %>

=========================================================
INTERVIEW POINTS
=========================================================

✔ Data is passed from Express to EJS using
  res.render().

✔ The second argument of res.render() is an object.

✔ EJS accesses the data using
  <%= variableName %>.

✔ Arrays and Objects can also be passed
  to EJS templates.

=========================================================
*/