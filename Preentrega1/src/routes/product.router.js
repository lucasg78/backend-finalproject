    // Import required modules
    const express = require('express');
    const { join } = require('path');
    const router = express.Router();
    const ProductManager = require('../managers/ProductManager');

    // Define the path to the products data file
    let productsFilePath = join(__dirname, '..', 'data', 'products.json');

    // Create an instance of the ProductManager class
    const products = new ProductManager(productsFilePath);

    // Route to get a list of products
    router.get("/", async (req, res) => {
        try {
            // Retrieve the 'limit' query parameter if present
            let limit = req.query.limit;
            // Retrieve the list of products, optionally limiting the result based on 'limit'
            let productList = limit ? (await products.getProducts()).slice(0, limit) : await products.getProducts();
            // Send the list of products as JSON in the response
            res.json({ products: productList });
        } catch (error) {
            // Handle errors by sending a 500 Internal Server Error response
            res.status(500).json({ error: error.message });
        }
    });

    // Route to get a specific product by ID
    router.get("/:pid", async (req, res) => {
        try {
            // Parse the 'pid' parameter as an integer to get the product ID
            let productId = parseInt(req.params.pid);
            // Retrieve the specific product by ID
            let product = await products.getProductById(productId);
            // Send the product as JSON in the response
            res.json({ product });
        } catch (error) {
            // Handle errors by sending a 404 Not Found response
            res.status(404).json({ error: error.message });
        }
    });

    // Route to add a new product
    router.post("/", async (req, res) => {
        try {
            // Extract the new product details from the request body
            const newProduct = req.body;
            // Add the new product to the product list
            await products.addProduct(newProduct);
            // Send a 201 Created response along with a success message
            res.status(201).json({ message: "Product created successfully" });
        } catch (error) {
            // Handle errors by sending a 400 Bad Request response
            res.status(400).json({ error: error.message });
        }
    });

    // Route to update an existing product by ID
    router.put("/:pid", async (req, res) => {
        try {
            // Parse the 'pid' parameter as an integer to get the product ID
            const productId = parseInt(req.params.pid);
            // Extract the updated product details from the request body
            const updatedProduct = req.body;
            // Update the existing product with the new details
            await products.updateProduct(productId, updatedProduct);
            // Send a success message in the response
            res.json({ message: "Product updated successfully" });
        } catch (error) {
            // Handle errors by sending a 400 Bad Request response
            res.status(400).json({ error: error.message });
        }
    });

    // Route to delete a product by ID
    router.delete("/:pid", async (req, res) => {
        try {
            // Parse the 'pid' parameter as an integer to get the product ID
            const productId = parseInt(req.params.pid);
            // Delete the product with the specified ID
            await products.deleteProduct(productId);
            // Send a success message in the response
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            // Handle errors by sending a 404 Not Found response
            res.status(404).json({ error: error.message });
        }
    });

    // Export the router for use in other modules
    module.exports = router;
