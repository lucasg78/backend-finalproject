# Backend Programming Course

## First delivery of the Final Project

This project involves building a Node.js and Express server to handle various endpoints related to managing products and shopping carts in an e-commerce platform. The server includes features for product management and shopping cart operations.

## Requirements

- Node.js installed on your machine
- Npm to install dependencies

## How to Run

1. Clone the repository to your local machine.
2. Navigate to the project directory using the command line.
3. Run the following command to install dependencies, including Express:

    ```bash
    npm install
    ```

4. Ensure that the `products.json` and `carts.json` files are present in the `data` directory with the required product and cart data.
5. Run the server with the following command:

    ```bash
    nodemon app.js
    ```

    This will start the server and automatically restart it whenever changes are made to the code.

6. The server will start on `http://localhost:8080`. You can access the endpoints described below.

## Endpoints

### 1. Homepage

- **Endpoint:** `/`
- **Description:** The root endpoint sends a welcome message.
- **Method:** GET
- **Example:** [http://localhost:8080/](http://localhost:8080/)

### 2. Product Management

#### 2.1 Get all Products and Products by Param Length Limit

- **Endpoint:** `/api/products`
- **Description:** Retrieves a list of products and optionally limits the response based on the "limit" query parameter.
- **Method:** GET
- **Query Parameter:** `limit` (optional)
- **Example:**
  - [http://localhost:8080/api/products/](http://localhost:8080/api/products/) (Get all products)
  - [http://localhost:8080/api/products/?limit=5](http://localhost:8080/api/products/?limit=5) (Get the first 5 products)

#### 2.2 Get Product by ID

- **Endpoint:** `/api/products/:id`
- **Description:** Retrieves a specific product by its ID.
- **Method:** GET
- **Parameter:** `id` (Product ID)
- **Examples:**
  - [http://localhost:8080/api/products/2](http://localhost:8080/api/products/2) (Get product with ID 2)
  - [http://localhost:8080/api/products/34123123](http://localhost:8080/api/products/34123123) (Example with non-existing ID)
    - If you attempt to retrieve a product with an ID that does not exist, the server will return an error object indicating that the product does not exist.

#### 2.3 Add New Product

- **Endpoint:** `/api/products/`
- **Description:** Adds a new product with specified fields.
- **Method:** POST
- **Example:** [http://localhost:8080/api/products/](http://localhost:8080/api/products/)

    ```json
    {
        "title": "New Product",
        "description": "Description of the new product",
        "code": 123,
        "price": 30,
        "status": true,
        "stock": 50,
        "thumbnails": []
    }
    ```

#### 2.4 Update Product by ID

- **Endpoint:** `/api/products/:id`
- **Description:** Updates a product by its ID with new data.
- **Method:** PUT
- **Example:** [http://localhost:8080/api/products/2](http://localhost:8080/api/products/2)

    ```json
    {
        "price": 35,
        "stock": 60
    }
    ```

#### 2.5 Delete Product by ID

- **Endpoint:** `/api/products/:id`
- **Description:** Deletes a product by its ID.
- **Method:** DELETE
- **Example:** [http://localhost:8080/api/products/2](http://localhost:8080/api/products/2)

### 3. Shopping Cart Management

#### 3.1 Get all Carts

- **Endpoint:** `/api/carts`
- **Description:** Retrieves a list of all shopping carts.
- **Method:** GET
- **Example:** [http://localhost:8080/api/carts/](http://localhost:8080/api/carts/)

#### 3.2 Create a New Cart

- **Endpoint:** `/api/carts`
- **Description:** Creates a new shopping cart.
- **Method:** POST
- **Example:** [http://localhost:8080/api/carts/](http://localhost:8080/api/carts/)

#### 3.3 Get Cart by ID

- **Endpoint:** `/api/carts/:cid`
- **Description:** Retrieves a specific shopping cart by its ID.
- **Method:** GET
- **Example:** [http://localhost:8080/api/carts/1](http://localhost:8080/api/carts/1)

#### 3.4 Add Product to Cart

- **Endpoint:** `/api/carts/:cid/product/:pid`
- **Description:** Adds a product to a specific shopping cart.
- **Method:** POST
- **Example:** [http://localhost:8080/api/carts/1/product/3](http://localhost:8080/api/carts/1/product/3)

    ```json
    {
        "quantity": 2
    }
    ```

### Error Handling

The server includes error handling for various scenarios. Here are some common error responses you may encounter:

### 1. Route Not Found

- **Status Code:** 404 Not Found
- **Response:**

  ```json
  {
      "error": "Route not found"
  }

### 2. Product Not Found

- **Status Code:** 404 Not Found
- **Response:**

  ```json
  {
      "error": "No product found with the specified ID"
  }

### 3. Product Already Exists in Cart

- **Status Code:** 400 Bad Request
- **Response:**

  ```json
  {
      "error": "Product already exists in the cart"
  }  

### 4. Missing Data

- **Status Code:** 400 Bad Request
- **Response:**

  ```json
  {
      "error": "Missing data"
  }

### 5. Invalid Product Code

- **Status Code:** 400 Bad Request
- **Response:**

  ```json
  {
      "error": "The code must be a number"
  }

## Product Manager Class (`ProductManager.js`)

This class is responsible for managing products. It loads product data from the `products.json` file, allows adding, updating, deleting, and retrieving products.

## Shopping Cart Manager Class (`CartManager.js`)

This class is responsible for managing shopping carts. It loads cart data from the `carts.json` file, allows creating new carts, getting carts by ID, and adding products to specific carts.

## Important Notes

- The product data is stored in the `products.json` file, and shopping cart data is stored in the `carts.json` file. Ensure these files are present and correctly formatted.
- Products are managed using the `ProductManager` class defined in `ProductManager.js`.
- Shopping carts are managed using the `CartManager` class defined in `CartManager.js`.

Feel free to explore and extend the functionality of this server for your specific needs.
