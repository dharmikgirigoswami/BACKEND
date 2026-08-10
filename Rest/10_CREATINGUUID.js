/*
===========================================================
CREATING IDs (UUID)
===========================================================

UUID = Universally Unique Identifier

A UUID is a unique identifier used to identify resources
such as users, products, orders, posts, etc.

Example UUID:

550e8400-e29b-41d4-a716-446655440000

Instead of using:

1
2
3
4

we can use UUIDs:

550e8400-e29b-41d4-a716-446655440000
7c9e6679-7425-40de-944b-e07fc1f90ae7


===========================================================
1. WHY DO WE NEED IDs?
===========================================================

Suppose we have users:

User 1
User 2
User 3


We can identify them using:

/users/1
/users/2
/users/3


But in larger applications, simple sequential IDs may not
always be ideal.

UUIDs provide identifiers designed to be extremely unlikely
to collide.


===========================================================
2. USING UUID IN NODE.JS
===========================================================

Modern Node.js provides UUID generation through the built-in
crypto module.

We can use:

crypto.randomUUID()


No external package is required.

===========================================================
3. BASIC UUID EXAMPLE
===========================================================
*/

const crypto = require("crypto");


// Generate a UUID

const id = crypto.randomUUID();

console.log(id);


/*
Example output:

550e8400-e29b-41d4-a716-446655440000


Every time you generate one, you normally get a different
UUID.


===========================================================
4. CREATING USERS WITH UUID
===========================================================
*/

const users = [

    {
        id: crypto.randomUUID(),
        name: "Dharmik",
        age: 20
    },

    {
        id: crypto.randomUUID(),
        name: "Rahul",
        age: 21
    }

];


console.log(users);


/*
Example structure:

[
    {
        id: "some-uuid",
        name: "Dharmik",
        age: 20
    },

    {
        id: "another-uuid",
        name: "Rahul",
        age: 21
    }
]


===========================================================
5. UUID WITH EXPRESS
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());


let usersData = [

    {
        id: crypto.randomUUID(),
        name: "Dharmik",
        age: 20
    },

    {
        id: crypto.randomUUID(),
        name: "Rahul",
        age: 21
    }

];


// =========================================================
// GET ALL USERS
// =========================================================

app.get("/users", (req, res) => {

    res.json(usersData);

});


// =========================================================
// GET ONE USER
// =========================================================

app.get("/users/:id", (req, res) => {

    const id = req.params.id;


    const user = usersData.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).json({

            message: "User not found"

        });

    }


    res.json(user);

});


// =========================================================
// CREATE USER
// =========================================================
//
// POST /users
//
// Body:
//
// {
//     "name": "Amit",
//     "age": 22
// }
//
// =========================================================

app.post("/users", (req, res) => {

    const { name, age } = req.body;


    const newUser = {

        id: crypto.randomUUID(),

        name: name,

        age: age

    };


    usersData.push(newUser);


    res.status(201).json({

        message: "User created successfully",

        user: newUser

    });

});


app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});


/*
===========================================================
6. HOW UUID CREATION WORKS
===========================================================

Client sends:

POST /users

Body:

{
    "name": "Amit",
    "age": 22
}


        ↓


Express receives request.


        ↓


Server generates:

crypto.randomUUID()


        ↓


New user:

{
    id: "generated-uuid",
    name: "Amit",
    age: 22
}


        ↓


User is stored.


===========================================================
7. UUID IN URL
===========================================================

Suppose a user has this UUID:

550e8400-e29b-41d4-a716-446655440000


The API can use:

GET /users/550e8400-e29b-41d4-a716-446655440000


Express:

app.get("/users/:id", ...)


Then:

req.params.id


contains the UUID.


===========================================================
8. FINDING A USER USING UUID
===========================================================
*/

app.get("/users/:id", (req, res) => {

    const id = req.params.id;


    const user = usersData.find((user) => {

        return user.id === id;

    });


    if (!user) {

        return res.status(404).json({

            message: "User not found"

        });

    }


    res.json(user);

});


/*
IMPORTANT:

With numeric IDs, we might need:

Number(req.params.id)


Example:

"10" → 10


But UUIDs are strings.

Therefore:

const id = req.params.id;

is enough.


===========================================================
9. UUID VS SIMPLE NUMBER ID
===========================================================

NUMBER ID:

1
2
3
4
5


UUID:

550e8400-e29b-41d4-a716-446655440000


Another UUID:

7c9e6679-7425-40de-944b-e07fc1f90ae7


-----------------------------------------------------------

NUMBER:

/users/1


UUID:

/users/550e8400-e29b-41d4-a716-446655440000


===========================================================
10. UUID DOES NOT MEAN "SECURITY"
===========================================================

UUIDs are identifiers.

They should not be treated as a replacement for:

- Authentication
- Authorization
- Access control
- Password protection

A UUID can make identifiers harder to guess than simple
sequential numbers, but that does NOT make an API secure.


===========================================================
11. UUID IN CRUD
===========================================================

CREATE:

POST /users

        ↓

Generate UUID

        ↓

Create user


READ:

GET /users/:id

        ↓

Find user using UUID


UPDATE:

PUT /users/:id

        ↓

Find user using UUID

        ↓

Update user


DELETE:

DELETE /users/:id

        ↓

Find user using UUID

        ↓

Delete user


===========================================================
12. COMPLETE CRUD EXAMPLE WITH UUID
===========================================================
*/

const expressApp = express();

expressApp.use(express.json());


let products = [];


// =========================================================
// CREATE
// =========================================================

expressApp.post("/products", (req, res) => {

    const { name, price } = req.body;


    const product = {

        id: crypto.randomUUID(),

        name: name,

        price: price

    };


    products.push(product);


    res.status(201).json(product);

});


// =========================================================
// READ
// =========================================================

expressApp.get("/products", (req, res) => {

    res.json(products);

});


// =========================================================
// SHOW ONE
// =========================================================

expressApp.get("/products/:id", (req, res) => {

    const id = req.params.id;


    const product = products.find((product) => {

        return product.id === id;

    });


    if (!product) {

        return res.status(404).json({

            message: "Product not found"

        });

    }


    res.json(product);

});


// =========================================================
// UPDATE
// =========================================================

expressApp.put("/products/:id", (req, res) => {

    const id = req.params.id;


    const product = products.find((product) => {

        return product.id === id;

    });


    if (!product) {

        return res.status(404).json({

            message: "Product not found"

        });

    }


    product.name = req.body.name;

    product.price = req.body.price;


    res.json({

        message: "Product updated successfully",

        product: product

    });

});


// =========================================================
// DELETE
// =========================================================

expressApp.delete("/products/:id", (req, res) => {

    const id = req.params.id;


    const productExists = products.some((product) => {

        return product.id === id;

    });


    if (!productExists) {

        return res.status(404).json({

            message: "Product not found"

        });

    }


    products = products.filter((product) => {

        return product.id !== id;

    });


    res.json({

        message: "Product deleted successfully"

    });

});


/*
===========================================================
13. IMPORTANT SYNTAX
===========================================================

Generate UUID:

const id = crypto.randomUUID();


Generate UUID while creating an object:

const user = {

    id: crypto.randomUUID(),

    name: "Dharmik"

};


Get UUID from URL:

const id = req.params.id;


Find resource:

const user = users.find((user) => {

    return user.id === id;

});


===========================================================
QUICK REVISION
===========================================================

UUID

↓

Universally Unique Identifier


Generate:

crypto.randomUUID()


Example:

const id = crypto.randomUUID();


Use in resource:

const user = {

    id: crypto.randomUUID(),

    name: "Dharmik"

};


Get from URL:

GET /users/:id


Read ID:

req.params.id


Unlike numeric IDs, UUIDs are strings, so we don't need:

Number(req.params.id)


===========================================================
END OF TOPIC 08
===========================================================
*/