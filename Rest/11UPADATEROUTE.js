/*
===========================================================
TOPIC 11: UPDATE ROUTE
===========================================================

UPDATE means changing an existing resource.

For example:

PUT /users/123

This means:

"Update the user whose ID is 123."


===========================================================
1. UPDATE ROUTE
===========================================================

In REST APIs, we commonly use:

PUT
PATCH

PUT:
    Used to replace/update the complete resource.

PATCH:
    Used to partially update a resource.


Examples:

PUT /users/:id

PATCH /users/:id


===========================================================
2. UPDATE VS EDIT
===========================================================

EDIT:

GET /users/:id/edit

Purpose:
Show the edit form.


UPDATE:

PUT /users/:id

or

PATCH /users/:id

Purpose:
Actually change the data.


Remember:

EDIT
→ Show the form


UPDATE
→ Change the resource


===========================================================
3. BASIC UPDATE EXAMPLE
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// Allow JSON request bodies

app.use(express.json());


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
// UPDATE ROUTE
// =========================================================
//
// PUT /users/:id
//
// Example:
//
// PUT /users/1
//
// Body:
//
// {
//     "name": "Dharmik Goswami",
//     "age": 21
// }
//
// =========================================================

app.put("/users/:id", (req, res) => {

    // Get ID from URL

    const id = Number(req.params.id);


    // Find user

    const user = users.find((user) => {

        return user.id === id;

    });


    // Check if user exists

    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }


    // Get new data

    const { name, age } = req.body;


    // Validate data

    if (!name || age === undefined) {

        return res.status(400).json({

            success: false,

            message: "Name and age are required"

        });

    }


    // Update user

    user.name = name;

    user.age = age;


    // Send response

    res.status(200).json({

        success: true,

        message: "User updated successfully",

        user: user

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
4. TESTING THE UPDATE ROUTE
===========================================================

Use Postman or Thunder Client.


METHOD:

PUT


URL:

http://localhost:3000/users/1


BODY → JSON:

{
    "name": "Dharmik Goswami",
    "age": 21
}


===========================================================
5. BEFORE UPDATE
===========================================================

User:

{
    id: 1,
    name: "Dharmik",
    age: 20
}


Request:

PUT /users/1


Body:

{
    "name": "Dharmik Goswami",
    "age": 21
}


===========================================================
6. AFTER UPDATE
===========================================================

User becomes:

{
    id: 1,
    name: "Dharmik Goswami",
    age: 21
}


===========================================================
7. HOW UPDATE WORKS
===========================================================

Client

    |
    | PUT /users/1
    |
    | JSON data
    ↓

Express

    |
    | req.params.id
    ↓

Find user

    |
    | User exists?
    ↓

YES                 NO
 |                   |
 ↓                   ↓
Update             404
 |
 ↓
Send response


===========================================================
8. PATCH ROUTE
===========================================================

PATCH is useful when we want to update only some fields.

For example, suppose the user is:

{
    id: 1,
    name: "Dharmik",
    age: 20
}


We only want to change the age.

Request:

PATCH /users/1


Body:

{
    "age": 21
}


We don't need to send the name.


===========================================================
9. PATCH EXAMPLE
===========================================================
*/

app.patch("/users/:id", (req, res) => {

    const id = Number(req.params.id);


    const user = users.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found"

        });

    }


    // Update only fields that were provided

    if (req.body.name !== undefined) {

        user.name = req.body.name;

    }


    if (req.body.age !== undefined) {

        user.age = req.body.age;

    }


    res.status(200).json({

        success: true,

        message: "User partially updated",

        user: user

    });

});


/*
===========================================================
10. PUT VS PATCH
===========================================================

PUT:

PUT /users/1

Body:

{
    "name": "Dharmik",
    "age": 21
}


Used when sending the complete representation that should
replace/update the resource.


-----------------------------------------------------------

PATCH:

PATCH /users/1

Body:

{
    "age": 21
}


Only the age is changed.


===========================================================
11. IMPORTANT EXAMPLE
===========================================================

Existing user:

{
    id: 1,
    name: "Dharmik",
    age: 20,
    city: "Surat"
}


PUT:

PUT /users/1

{
    "name": "Dharmik",
    "age": 21,
    "city": "Ahmedabad"
}


The complete resource representation is supplied.


PATCH:

PATCH /users/1

{
    "city": "Ahmedabad"
}


Only the city is changed.


===========================================================
12. UPDATE USING UUID
===========================================================

If you are using UUIDs instead of numeric IDs:

const crypto = require("crypto");


Example user:

{
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Dharmik"
}


Route:

PUT /users/:id


Code:
*/

const updateWithUUID = (req, res) => {

    const id = req.params.id;


    const user = users.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).json({

            message: "User not found"

        });

    }


    user.name = req.body.name;

    user.age = req.body.age;


    res.json({

        message: "User updated successfully",

        user: user

    });

};


/*
IMPORTANT:

Numeric ID:

const id = Number(req.params.id);


UUID:

const id = req.params.id;


Because UUIDs are strings.


===========================================================
13. UPDATE WITH DATABASE
===========================================================

In a real application, we normally update data in a
database rather than an array.

For example, with MongoDB/Mongoose:

User.findByIdAndUpdate()


Conceptually:

PUT /users/:id

        ↓

Get ID

        ↓

Find user in database

        ↓

Update user

        ↓

Save changes

        ↓

Return response


Example structure:

*/

app.put("/users/:id", async (req, res) => {

    try {

        const id = req.params.id;


        /*
        Example with Mongoose:

        const user = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true
            }
        );
        */


        res.json({

            message: "User updated successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Server error"

        });

    }

});


/*
===========================================================
14. UPDATE STATUS CODES
===========================================================

200 OK

Update was successful.


400 Bad Request

The request data is invalid or incomplete.


404 Not Found

The requested resource does not exist.


500 Internal Server Error

Something went wrong on the server.


===========================================================
15. COMPLETE RESTFUL USER ROUTES
===========================================================

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

→ Update complete resource


PATCH

PATCH /users/:id

→ Partially update resource


DESTROY

DELETE /users/:id

→ Delete resource


===========================================================
16. COMPLETE CRUD MAPPING
===========================================================

CREATE

POST /users


READ

GET /users
GET /users/:id


UPDATE

PUT /users/:id
PATCH /users/:id


DELETE

DELETE /users/:id


===========================================================
17. MOST IMPORTANT POINT
===========================================================

EDIT and UPDATE are different.

EDIT:

GET /users/1/edit

        ↓

Show edit form


UPDATE:

PUT /users/1

        ↓

Actually update user


PATCH:

PATCH /users/1

        ↓

Partially update user


===========================================================
QUICK REVISION
===========================================================

UPDATE:

PUT /users/:id


Example:

PUT /users/1

{
    "name": "Dharmik",
    "age": 21
}


PARTIAL UPDATE:

PATCH /users/:id


Example:

PATCH /users/1

{
    "age": 21
}


PUT
→ Complete update/replacement


PATCH
→ Partial update


EDIT
→ Display form


UPDATE
→ Change data


===========================================================
END OF TOPIC 10
===========================================================
*/