/*
===========================================================
TOPIC 03: CREATING RESTFUL APIs
===========================================================

In Topic 01, we learned what REST is.
In Topic 02, we learned CRUD operations.

Now we will create a proper RESTful API using Express.js.

===========================================================
1. WHAT IS A RESTful API?
===========================================================

A RESTful API is an API that follows REST principles.

It represents data as RESOURCES and uses HTTP methods
to perform operations on those resources.

Example resource:

/users

HTTP methods:

GET     /users       -> Get users
POST    /users       -> Create user
GET     /users/1     -> Get user 1
PUT     /users/1     -> Update user 1
PATCH   /users/1     -> Partially update user 1
DELETE  /users/1     -> Delete user 1


===========================================================
2. CREATE OUR PROJECT
===========================================================

Create a folder:

rest-api

Open it in VS Code.

Run:

npm init -y

Install Express:

npm install express

Create:

app.js


===========================================================
3. BASIC EXPRESS SERVER
===========================================================
*/

const express = require("express");

const app = express();

const PORT = 3000;


// =========================================================
// MIDDLEWARE
// =========================================================

// Allows Express to read JSON data from request body
app.use(express.json());


// =========================================================
// TEMPORARY DATABASE
// =========================================================

// We are using an array instead of MongoDB for now.

let products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    },
    {
        id: 2,
        name: "Keyboard",
        price: 1500
    },
    {
        id: 3,
        name: "Mouse",
        price: 800
    }
];


// =========================================================
// 4. GET ALL PRODUCTS
// =========================================================
//
// GET /products
//
// This endpoint returns all products.
// =========================================================

app.get("/products", (req, res) => {

    res.status(200).json({
        success: true,
        products: products
    });

});


// =========================================================
// 5. GET ONE PRODUCT
// =========================================================
//
// GET /products/:id
//
// Example:
//
// GET /products/2
//
// =========================================================

app.get("/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find((product) => {
        return product.id === id;
    });

    if (!product) {

        return res.status(404).json({
            success: false,
            message: "Product not found"
        });

    }

    res.status(200).json({
        success: true,
        product: product
    });

});


// =========================================================
// 6. CREATE PRODUCT
// =========================================================
//
// POST /products
//
// Request body:
//
// {
//     "name": "Monitor",
//     "price": 12000
// }
//
// =========================================================

app.post("/products", (req, res) => {

    const { name, price } = req.body;


    // Basic validation

    if (!name || !price) {

        return res.status(400).json({
            success: false,
            message: "Name and price are required"
        });

    }


    const newProduct = {

        id: products.length + 1,

        name: name,

        price: price

    };


    products.push(newProduct);


    res.status(201).json({

        success: true,

        message: "Product created successfully",

        product: newProduct

    });

});


// =========================================================
// 7. UPDATE PRODUCT
// =========================================================
//
// PUT /products/:id
//
// Example:
//
// PUT /products/1
//
// Body:
//
// {
//     "name": "Gaming Laptop",
//     "price": 70000
// }
//
// =========================================================

app.put("/products/:id", (req, res) => {

    const id = Number(req.params.id);


    const product = products.find((product) => {

        return product.id === id;

    });


    if (!product) {

        return res.status(404).json({

            success: false,

            message: "Product not found"

        });

    }


    const { name, price } = req.body;


    if (!name || !price) {

        return res.status(400).json({

            success: false,

            message: "Name and price are required"

        });

    }


    product.name = name;

    product.price = price;


    res.status(200).json({

        success: true,

        message: "Product updated successfully",

        product: product

    });

});


// =========================================================
// 8. PARTIAL UPDATE
// =========================================================
//
// PATCH /products/:id
//
// Example:
//
// PATCH /products/1
//
// Body:
//
// {
//     "price": 60000
// }
//
// Only the price will be changed.
// =========================================================

app.patch("/products/:id", (req, res) => {

    const id = Number(req.params.id);


    const product = products.find((product) => {

        return product.id === id;

    });


    if (!product) {

        return res.status(404).json({

            success: false,

            message: "Product not found"

        });

    }


    if (req.body.name !== undefined) {

        product.name = req.body.name;

    }


    if (req.body.price !== undefined) {

        product.price = req.body.price;

    }


    res.status(200).json({

        success: true,

        message: "Product partially updated",

        product: product

    });

});


// =========================================================
// 9. DELETE PRODUCT
// =========================================================
//
// DELETE /products/:id
//
// Example:
//
// DELETE /products/2
// =========================================================

app.delete("/products/:id", (req, res) => {

    const id = Number(req.params.id);


    const productExists = products.some((product) => {

        return product.id === id;

    });


    if (!productExists) {

        return res.status(404).json({

            success: false,

            message: "Product not found"

        });

    }


    products = products.filter((product) => {

        return product.id !== id;

    });


    res.status(200).json({

        success: true,

        message: "Product deleted successfully"

    });

});


// =========================================================
// 10. 404 ROUTE
// =========================================================
//
// This executes when no matching route is found.
// =========================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found"

    });

});


// =========================================================
// 11. START SERVER
// =========================================================

app.listen(PORT, () => {

    console.log(
        `RESTful API running at http://localhost:${PORT}`
    );

});


/*
===========================================================
12. API ENDPOINTS
===========================================================

METHOD       ENDPOINT             PURPOSE

GET          /products            Get all products

GET          /products/:id        Get one product

POST         /products            Create product

PUT          /products/:id        Update product

PATCH        /products/:id        Partially update product

DELETE       /products/:id        Delete product


===========================================================
13. TESTING THE API
===========================================================

You can use:

Postman
Thunder Client
Insomnia


-----------------------------------------------------------
GET ALL PRODUCTS
-----------------------------------------------------------

GET

http://localhost:3000/products


-----------------------------------------------------------
GET ONE PRODUCT
-----------------------------------------------------------

GET

http://localhost:3000/products/1


-----------------------------------------------------------
CREATE PRODUCT
-----------------------------------------------------------

POST

http://localhost:3000/products

Body → JSON:

{
    "name": "Monitor",
    "price": 12000
}


-----------------------------------------------------------
UPDATE PRODUCT
-----------------------------------------------------------

PUT

http://localhost:3000/products/1

Body → JSON:

{
    "name": "Gaming Laptop",
    "price": 70000
}


-----------------------------------------------------------
PARTIAL UPDATE
-----------------------------------------------------------

PATCH

http://localhost:3000/products/1

Body → JSON:

{
    "price": 60000
}


-----------------------------------------------------------
DELETE PRODUCT
-----------------------------------------------------------

DELETE

http://localhost:3000/products/1


===========================================================
14. RESTful URL DESIGN
===========================================================

GOOD RESTful URLs:

/products
/products/1
/users
/users/10
/orders
/orders/50


Avoid putting the action in the URL:

❌ /getProducts
❌ /createProduct
❌ /deleteProduct
❌ /updateProduct


Instead, use the HTTP method:

GET    /products
POST   /products
DELETE /products/1
PUT    /products/1


===========================================================
15. STATUS CODES USED
===========================================================

200
----
Request successful.


201
----
Resource successfully created.


400
----
Bad request.

Example:
Required data was not provided.


404
----
Resource or route was not found.


===========================================================
16. COMPLETE RESTFUL API FLOW
===========================================================

Client
   |
   | POST /products
   | JSON data
   ↓
Express.js
   |
   | Validate request
   ↓
Create product
   |
   ↓
Database / Data Store
   |
   ↓
JSON Response
   |
   ↓
Client


===========================================================
17. IMPORTANT CONCEPT
===========================================================

RESTful API design mainly consists of:

RESOURCE
    ↓
URL
    ↓
HTTP METHOD
    ↓
REQUEST
    ↓
SERVER PROCESSING
    ↓
RESPONSE


Example:

RESOURCE:
    products

URL:
    /products/10

METHOD:
    GET

Meaning:

"Give me product number 10."


===========================================================
QUICK REVISION
===========================================================

RESTful API:

GET
    /products
    → Get all products

GET
    /products/1
    → Get one product

POST
    /products
    → Create product

PUT
    /products/1
    → Update product

PATCH
    /products/1
    → Partially update product

DELETE
    /products/1
    → Delete product


IMPORTANT:

REST uses resources instead of action-based URLs.

Resource:
    /products

Not:

    /getProducts
    /createProduct
    /deleteProduct


===========================================================
END OF TOPIC 03
===========================================================
*/