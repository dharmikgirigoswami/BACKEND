/*
===========================================================
TOPIC 08: DELETE / DESTROY ROUTE
===========================================================

The DELETE / DESTROY route is used to remove an existing
resource.

For example:

DELETE /users/1

means:

"Delete the user whose ID is 1."


===========================================================
1. DELETE ROUTE
===========================================================

HTTP METHOD:

DELETE

ROUTE:

DELETE /users/:id


Example:

DELETE /users/5


The server:

1. Gets the ID
2. Finds the resource
3. Deletes the resource
4. Sends a response


===========================================================
2. DELETE VS DESTROY
===========================================================

In REST terminology, this operation is often called:

DESTROY

In Express.js, we normally write:

app.delete(...)

So:

DESTROY
   ↓
DELETE HTTP method


===========================================================
3. BASIC DELETE ROUTE
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// =========================================================
// SAMPLE DATA
// =========================================================

let users = [

    {
        id: 1,
        name: "Dharmik",
        age: 20
    },

    {
        id: 2,
        name: "Rahul",
        age: 21
    },

    {
        id: 3,
        name: "Amit",
        age: 22
    }

];


// =========================================================
// INDEX ROUTE
// =========================================================

app.get("/users", (req, res) => {

    res.json(users);

});


// =========================================================
// DELETE / DESTROY ROUTE
// =========================================================
//
// DELETE /users/:id
//
// Example:
//
// DELETE /users/2
// =========================================================

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);


    // Check whether user exists

    const userExists = users.some((user) => {

        return user.id === id;

    });


    if (!userExists) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }


    // Remove the user

    users = users.filter((user) => {

        return user.id !== id;

    });


    // Send response

    res.status(200).json({

        success: true,

        message: "User deleted successfully"

    });

});


// =========================================================
// START SERVER
// =========================================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});


/*
===========================================================
4. HOW TO TEST
===========================================================

Start the server:

node app.js


Use Postman or Thunder Client.


Method:

DELETE


URL:

http://localhost:3000/users/2


The server receives:

req.params.id

Value:

"2"


Then:

Number("2")

becomes:

2


The user with ID 2 is removed.


===========================================================
5. BEFORE DELETE
===========================================================

users:

[
    {
        id: 1,
        name: "Dharmik"
    },

    {
        id: 2,
        name: "Rahul"
    },

    {
        id: 3,
        name: "Amit"
    }
]


Request:

DELETE /users/2


===========================================================
6. AFTER DELETE
===========================================================

users:

[
    {
        id: 1,
        name: "Dharmik"
    },

    {
        id: 3,
        name: "Amit"
    }
]


User 2 has been removed.


===========================================================
7. WHY DO WE USE FILTER()?
===========================================================

This code:

users = users.filter((user) => {

    return user.id !== id;

});


means:

"Create a new array containing every user except the
user whose ID matches the requested ID."


Example:

id = 2


User 1:

1 !== 2

true

Keep user 1.


User 2:

2 !== 2

false

Remove user 2.


User 3:

3 !== 2

true

Keep user 3.


===========================================================
8. DELETE WITH DATABASE
===========================================================

In a real application, we usually don't delete from
an array.

We delete from a database.

Example with MongoDB/Mongoose:

User.findByIdAndDelete(id)


The general flow becomes:

DELETE /users/10

        ↓

Express

        ↓

Get ID

        ↓

Database

        ↓

Find user 10

        ↓

Delete user

        ↓

Send response


===========================================================
9. DELETE WITH MONGOOSE EXAMPLE
===========================================================

Later, when you learn MongoDB + Mongoose, you may write:

*/

app.delete("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;

        // Example:
        // await User.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message: "User deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "Server error"

        });

    }

});


/*
The exact database code depends on the model being used.


===========================================================
10. WHAT IF THE USER DOES NOT EXIST?
===========================================================

Request:

DELETE /users/100


If user 100 doesn't exist:

Response:

Status:

404 Not Found


JSON:

{
    "success": false,
    "message": "User not found"
}


This is better than pretending that the deletion happened.


===========================================================
11. DELETE ROUTE AND HTTP STATUS CODES
===========================================================

200 OK
------

The delete operation succeeded and the server sends
a response.


204 No Content
--------------

The delete operation succeeded and there is no response
body.


404 Not Found
-------------

The resource does not exist.


500 Internal Server Error
-------------------------

Something went wrong on the server.


===========================================================
12. COMPLETE RESTFUL RESOURCE ROUTES
===========================================================

RESOURCE:

users


INDEX

GET /users

→ Show all users


NEW

GET /users/new

→ Show create form


CREATE

POST /users

→ Create user


SHOW

GET /users/:id

→ Show one user


EDIT

GET /users/:id/edit

→ Show edit form


UPDATE

PUT /users/:id

→ Update user


PATCH

PATCH /users/:id

→ Partially update user


DESTROY

DELETE /users/:id

→ Delete user


===========================================================
13. COMPLETE CRUD MAPPING
===========================================================

CREATE:

POST /users


READ:

GET /users
GET /users/:id


UPDATE:

PUT /users/:id
PATCH /users/:id


DELETE:

DELETE /users/:id


===========================================================
14. IMPORTANT DIFFERENCE
===========================================================

DELETE:

DELETE /users/5

means:

"Remove user 5."


SHOW:

GET /users/5

means:

"Show user 5."


EDIT:

GET /users/5/edit

means:

"Show the form to edit user 5."


UPDATE:

PUT /users/5

means:

"Update user 5."


===========================================================
15. COMPLETE DELETE FLOW
===========================================================

Client

   |

   | DELETE /users/2

   ↓

Express

   |

   | req.params.id

   ↓

Find user

   |

   | User exists?

   ↓

YES ---------------- NO
 |                    |
 ↓                    ↓
Delete             404 Response
 |
 ↓
Success Response


===========================================================
QUICK REVISION
===========================================================

DELETE /users/:id

        ↓

DESTROY RESOURCE


Example:

DELETE /users/10


Express:

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    // Find and delete resource

});


Remember:

GET
→ Read


POST
→ Create


PUT / PATCH
→ Update


DELETE
→ Delete / Destroy


===========================================================
END OF TOPIC 08
===========================================================
*/