// ==========================================
// Getting Started with Express.js
// Basic Code Structure
// ==========================================

// Step 1: Import the Express module
// require() loads the Express package
const express = require("express");

// Step 2: Create an Express application
// The 'app' object is used to define routes,
// middleware, and start the server.
const app = express();

// Step 3: Define the port number
// The server will run on port 3000
const PORT = 3000;

// Step 4: Create the Home Route
// app.get() handles GET requests
// "/" represents the Home Page
app.get("/", (req, res) => {

    // req = Request Object
    // Contains information sent by the client

    // res = Response Object
    // Used to send data back to the client

    res.send("Hello, Express.js!");
});

// Step 5: Create another route
app.get("/about", (req, res) => {
    res.send("Welcome to the About Page");
});

// Step 6: Create Contact Route
app.get("/contact", (req, res) => {
    res.send("Welcome to the Contact Page");
});

// Step 7: Start the Express Server
// app.listen() starts the server
app.listen(PORT, () => {

    // This callback runs once the server starts
    console.log(`Server is running on http://localhost:${PORT}`);

});

/*
==========================================
OUTPUT
==========================================

Browser:

http://localhost:3000/
Output:
Hello, Express.js!

------------------------------------------

http://localhost:3000/about
Output:
Welcome to the About Page

------------------------------------------

http://localhost:3000/contact
Output:
Welcome to the Contact Page

------------------------------------------

Terminal:
Server is running on http://localhost:3000

==========================================
FLOW OF EXECUTION
==========================================

1. Import Express
2. Create Express App
3. Define Port
4. Create Routes
5. Start Server
6. Browser sends Request
7. Express matches the Route
8. Server sends Response

==========================================
IMPORTANT POINTS

express()      -> Creates Express Application
app.get()      -> Handles GET Requests
req            -> Request Object
res            -> Response Object
res.send()     -> Sends Response
app.listen()   -> Starts Server
PORT           -> Port Number

==========================================
COMMON MISTAKES

1. Forgetting to install Express
   npm install express

2. Forgetting app.listen()

3. Forgetting res.send()

4. Wrong route URL

========================================== */