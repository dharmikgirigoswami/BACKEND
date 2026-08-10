/*
===========================================================
TOPIC 09: REDIRECT
===========================================================

REDIRECT is used to send the user from one route to another.

In Express.js, we use:

res.redirect()

Example:

res.redirect("/users");


This tells the browser:

"Go to /users"


===========================================================
1. BASIC REDIRECT
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// =========================================================
// HOME ROUTE
// =========================================================

app.get("/", (req, res) => {

    res.send("This is the Home Page");

});


// =========================================================
// REDIRECT ROUTE
// =========================================================

app.get("/home", (req, res) => {

    res.redirect("/");

});


/*
===========================================================
HOW IT WORKS
===========================================================

User visits:

/home

        ↓

Express executes:

res.redirect("/")

        ↓

Browser goes to:

/


So:

/home

automatically sends the user to:

/


===========================================================
2. REDIRECT TO ANOTHER PAGE
===========================================================
*/

app.get("/old-page", (req, res) => {

    res.redirect("/new-page");

});


app.get("/new-page", (req, res) => {

    res.send("Welcome to the new page!");

});


/*
===========================================================
FLOW
===========================================================

GET /old-page

        ↓

redirect("/new-page")

        ↓

GET /new-page

        ↓

"Welcome to the new page!"


===========================================================
3. REDIRECT AFTER CREATE
===========================================================

Redirects are very commonly used after creating data.

Example:

User submits a form.

POST /users

        ↓

Create user

        ↓

Redirect to:

/users/1


===========================================================
4. CREATE + REDIRECT EXAMPLE
===========================================================
*/

app.use(express.urlencoded({ extended: true }));


let users = [];


// =========================================================
// NEW ROUTE
// =========================================================

app.get("/users/new", (req, res) => {

    res.send(`

        <h1>Create User</h1>

        <form action="/users" method="POST">

            <input
                type="text"
                name="name"
                placeholder="Enter name"
            >

            <br><br>

            <input
                type="number"
                name="age"
                placeholder="Enter age"
            >

            <br><br>

            <button type="submit">
                Create User
            </button>

        </form>

    `);

});


// =========================================================
// CREATE ROUTE
// =========================================================

app.post("/users", (req, res) => {

    const newUser = {

        id: users.length + 1,

        name: req.body.name,

        age: req.body.age

    };


    users.push(newUser);


    // Redirect after creating the user

    res.redirect(`/users/${newUser.id}`);

});


// =========================================================
// SHOW ROUTE
// =========================================================

app.get("/users/:id", (req, res) => {

    const id = Number(req.params.id);


    const user = users.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).send("User not found");

    }


    res.send(`

        <h1>User Details</h1>

        <p>ID: ${user.id}</p>

        <p>Name: ${user.name}</p>

        <p>Age: ${user.age}</p>

    `);

});


/*
===========================================================
5. WHY REDIRECT AFTER CREATE?
===========================================================

Suppose the user submits:

POST /users

The server creates the user.

Instead of displaying the entire user page inside the
POST route, we can redirect:

res.redirect(`/users/${newUser.id}`);


Flow:

POST /users

     ↓

Create User

     ↓

Redirect

     ↓

GET /users/1

     ↓

Show User


This keeps the routes organized.


===========================================================
6. REDIRECT AFTER DELETE
===========================================================

Redirects are also useful after deleting something.

Example:

DELETE /users/1

        ↓

Delete User

        ↓

Redirect to:

/users


Example:
*/

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);


    users = users.filter((user) => {

        return user.id !== id;

    });


    // Redirect to users list

    res.redirect("/users");

});


/*
NOTE:

Browsers do not normally send DELETE requests from a basic
HTML form directly. REST clients/frontend applications can
send DELETE requests.

For traditional server-rendered forms, method override is
often used when PUT/PATCH/DELETE are needed.


===========================================================
7. REDIRECT WITH STATUS CODE
===========================================================

Express can also specify an HTTP status code.

Example:

res.redirect(302, "/users");


302 means:

Found / Temporary Redirect


Another example:

res.redirect(301, "/new-page");


301 means:

Moved Permanently


For normal application navigation, Express commonly uses
302 by default.


===========================================================
8. REDIRECT TO EXTERNAL WEBSITE
===========================================================

We can also redirect to another website.

Example:
*/

app.get("/google", (req, res) => {

    res.redirect("https://www.google.com");

});


/*
Now:

GET /google

will redirect the browser to Google.


===========================================================
9. REDIRECT VS SEND
===========================================================

res.send()
----------

Sends a response directly.

Example:

res.send("Hello");


The browser stays on the same URL.


-----------------------------------------------------------

res.redirect()
--------------

Tells the browser to go to another URL.

Example:

res.redirect("/users");


The browser navigates to:

/users


===========================================================
10. REDIRECT VS RENDER
===========================================================

res.redirect():

Move the user to another route.


res.render():

Render an HTML/EJS page.


Example:

res.redirect("/users");


vs


res.render("users/index");


===========================================================
11. REDIRECT IN A CRUD APPLICATION
===========================================================

A typical application can work like this:


CREATE
------

POST /users

        ↓

Create user

        ↓

redirect("/users/:id")

        ↓

SHOW


UPDATE
------

PUT /users/:id

        ↓

Update user

        ↓

redirect("/users/:id")

        ↓

SHOW


DELETE
------

DELETE /users/:id

        ↓

Delete user

        ↓

redirect("/users")

        ↓

INDEX


===========================================================
12. COMPLETE ROUTE FLOW
===========================================================

INDEX

GET /users

        ↓

Show all users


NEW

GET /users/new

        ↓

Show create form


CREATE

POST /users

        ↓

Create user

        ↓

REDIRECT

        ↓

SHOW

GET /users/:id


EDIT

GET /users/:id/edit

        ↓

Show edit form


UPDATE

PUT /users/:id

        ↓

Update user

        ↓

REDIRECT

        ↓

SHOW


DESTROY

DELETE /users/:id

        ↓

Delete user

        ↓

REDIRECT

        ↓

INDEX


===========================================================
13. IMPORTANT CONCEPT
===========================================================

Redirect does NOT mean:

"Send some text to the browser."

Instead:

Redirect means:

"Tell the browser to make a request to another URL."


Example:

res.redirect("/users");


The browser then requests:

GET /users


===========================================================
14. COMMON EXAMPLE
===========================================================

Login application:

POST /login

        ↓

Check username/password

        ↓

Login successful

        ↓

res.redirect("/dashboard")


Then:

GET /dashboard

        ↓

Show dashboard


If login fails:

res.redirect("/login")


===========================================================
QUICK REVISION
===========================================================

REDIRECT:

res.redirect("/users");


Example:

app.get("/home", (req, res) => {

    res.redirect("/users");

});


Meaning:

/home
 ↓
/users


Most common use:

POST /users

     ↓
Create

     ↓
res.redirect("/users/1")

     ↓
GET /users/1

     ↓
Show user


IMPORTANT:

res.send()
→ Send response


res.redirect()
→ Move browser to another route


res.render()
→ Render a view


===========================================================
END OF TOPIC 09
===========================================================
*/