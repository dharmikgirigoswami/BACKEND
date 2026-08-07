// Import Express
const express = require("express");

// Create an Express application
const app = express();

// Home Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});