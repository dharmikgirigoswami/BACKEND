// =========================================================
// Topic: Using Directory in Express.js
// File: app.js
// =========================================================

/*
=========================================================
WHAT IS A DIRECTORY?
=========================================================

A Directory is simply a Folder.

In Express.js, directories are used to organize files
such as:

views/      -> EJS files
public/     -> CSS, Images, JavaScript
routes/     -> Route files
node_modules/ -> Installed packages

=========================================================
COMMON PROJECT STRUCTURE
=========================================================

Project Folder/

│── node_modules/
│── public/
│     ├── css/
│     ├── js/
│     └── images/
│
│── views/
│     ├── index.ejs
│     ├── about.ejs
│     └── contact.ejs
│
│── routes/
│     └── user.js
│
│── app.js
│── package.json

=========================================================
USING A DIRECTORY
=========================================================

Express provides the built-in module "path"
to work with directories.

The following example tells Express to use
the "public" directory for static files.
*/

const express = require("express");
const path = require("path");

const app = express();

/*
=========================================================
SET STATIC DIRECTORY
=========================================================

path.join(__dirname, "public")

__dirname
-> Current project folder

path.join()
-> Joins folder names safely.

express.static()
-> Makes the public folder accessible
   through the browser.
*/

app.use(express.static(path.join(__dirname, "public")));

/*
=========================================================
SET VIEWS DIRECTORY
=========================================================

By default Express uses:

views/

If your folder name is different,
you can specify it manually.
*/

app.set("views", path.join(__dirname, "views"));

/*
=========================================================
SET EJS AS VIEW ENGINE
=========================================================
*/

app.set("view engine", "ejs");

/*
=========================================================
HOME ROUTE
=========================================================
*/

app.get("/", (req, res) => {

    res.render("index");

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
HOW DIRECTORY WORKS
=========================================================

__dirname

Suppose project is stored at:

C:\Hello World\EXPRESS JS

Then,

console.log(__dirname);

Output:

C:\Hello World\EXPRESS JS

---------------------------------------------------------

path.join(__dirname, "public")

Output:

C:\Hello World\EXPRESS JS\public

---------------------------------------------------------

path.join(__dirname, "views")

Output:

C:\Hello World\EXPRESS JS\views

=========================================================
OUTPUT
=========================================================

http://localhost:3000/

Express renders:

views/index.ejs

---------------------------------------------------------

http://localhost:3000/style.css

Express serves:

public/style.css

=========================================================
IMPORTANT METHODS
=========================================================

__dirname
-> Returns current project directory.

path.join()
-> Joins directory paths safely.

express.static()
-> Serves static files from a directory.

app.set("views", ...)
-> Sets the views directory.

=========================================================
COMMON MISTAKES
=========================================================

1. Forgetting to import "path".

const path = require("path");

---------------------------------------------------------

2. Writing folder name incorrectly.

Correct:
"public"

Wrong:
"Public"

---------------------------------------------------------

3. Forgetting express.static()

Without it, CSS, images, and JavaScript
files will not load.

---------------------------------------------------------

4. Using __dirname incorrectly.

Correct:
path.join(__dirname, "public")

Wrong:
path.join("public")

=========================================================
INTERVIEW POINTS
=========================================================

✔ A directory is a folder used to organize project files.

✔ __dirname returns the absolute path of the current project.

✔ path.join() creates platform-independent file paths.

✔ express.static() is used to serve static files.

✔ app.set("views", ...) changes the default views directory.

=========================================================
*/