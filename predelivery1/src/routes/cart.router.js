const express = require('express');
const { join } = require('path');
const router = express.Router();
const CartManager = require('../managers/CartManager');

// Define the path to the carts data file
let cartsFilePath = join(__dirname, '..', 'data', 'carts.json');

// Create an instance of the CartManager class
const carts = new CartManager(cartsFilePath);

// Route to get a list of all carts
router.get("/", async (req, res) => {
    try {
        res.json({ carts: await carts.getAllCarts() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new cart
router.post("/", async (req, res) => {
    try {
        const newCart = req.body;
        await carts.addCart(newCart);
        res.json({ message: "Cart created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a specific cart by ID
router.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await carts.getCartById(cartId);
        res.json({ cart });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Route to add a product to a specific cart
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;

        // Get the cart
        const cart = await carts.getCartById(cartId);

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(product => product.id === productId);

        if (existingProduct) {
            // If the product exists, update its quantity
            existingProduct.quantity += quantity;
        } else {
            // If the product is not in the cart, add it with the given quantity
            cart.products.push({ id: productId, quantity });
        }

        // Save the updated cart
        await carts.saveCarts();

        res.json({ message: "Product added to the cart successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Export the router for use in other modules
module.exports = router;
