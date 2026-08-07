// ==========================================
// Handling Requests in Express.js
// ==========================================

// Import Express
const express = require("express");

// Create Express App
const app = express();

// ------------------------------------------
// GET Request
// URL: http://localhost:3000/
// ------------------------------------------
app.get("/", (req, res) => {
    res.send("This is a GET Request");
});

// ------------------------------------------
// GET Request
// URL: http://localhost:3000/about
// ------------------------------------------
app.get("/about", (req, res) => {
    res.send("Welcome to the About Page");
});

// ------------------------------------------
// POST Request
// URL: http://localhost:3000/create
// ------------------------------------------
app.post("/create", (req, res) => {
    res.send("Data Created Successfully");
});

// ------------------------------------------
// PUT Request
// URL: http://localhost:3000/update
// ------------------------------------------
app.put("/update", (req, res) => {
    res.send("Data Updated Successfully");
});

// ------------------------------------------
// DELETE Request
// URL: http://localhost:3000/delete
// ------------------------------------------
app.delete("/delete", (req, res) => {
    res.send("Data Deleted Successfully");
});

// Start Server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

/*
==========================================
OUTPUT
==========================================

GET /
→ This is a GET Request

GET /about
→ Welcome to the About Page

POST /create
→ Data Created Successfully

PUT /update
→ Data Updated Successfully

DELETE /delete
→ Data Deleted Successfully

==========================================
REQUEST METHODS

app.get()     → Read/Get Data
app.post()    → Create New Data
app.put()     → Update Existing Data
app.delete()  → Delete Data

==========================================
PARAMETERS

req  → Request Object
       Contains information sent by the client.

res  → Response Object
       Sends a response back to the client.

==========================================
COMMON MISTAKES

1. Using the wrong HTTP method.
2. Forgetting to send a response (res.send()).
3. Visiting POST, PUT, or DELETE routes directly in the browser.
   The browser address bar only sends GET requests.
4. Forgetting to start the server with app.listen().

==========================================
*/