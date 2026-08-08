// ==========================================
// Sending Request and Response in Express.js
// ==========================================

// Import Express
const express = require("express");

// Create Express Application
const app = express();

// ------------------------------------------
// Route 1
// ------------------------------------------
app.get("/", (req, res) => {

    // req = Request Object
    // Contains information sent by the client

    console.log(req.method);      // GET
    console.log(req.url);         // /
    console.log(req.headers);     // Request Headers

    // res = Response Object
    // Sends data back to the client

    res.send("Hello World");

});

// ------------------------------------------
// Route 2
// ------------------------------------------
app.get("/about", (req, res) => {

    res.send("Welcome to About Page");

});

// ------------------------------------------
// Route 3
// ------------------------------------------
app.get("/contact", (req, res) => {

    res.send("Contact Us");

});

// Start Server
app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});

/*
==========================================
REQUEST OBJECT (req)

req.method      -> HTTP Method (GET, POST...)
req.url         -> Requested URL
req.headers     -> Request Headers
req.params      -> Route Parameters
req.query       -> Query Parameters
req.body        -> Data sent by the client (POST/PUT)

==========================================
RESPONSE OBJECT (res)

res.send()      -> Send Text/HTML Response
res.json()      -> Send JSON Data
res.status()    -> Set Status Code
res.sendFile()  -> Send a File
res.redirect()  -> Redirect to another Route

==========================================
OUTPUT

Browser:
http://localhost:3000/

Hello World

Terminal:
GET
/
{ Request Headers }

==========================================
*/