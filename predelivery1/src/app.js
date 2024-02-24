// Import the Express.js framework
const express = require("express");
// Create an instance of the Express application
const app = express();
// Set the port number for the server to listen on
const PORT = 8080;

// Import routers for handling product and cart routes
const productRouter = require("./routes/product.router");
const cartRouter = require("./routes/cart.router");

// Configure middleware to parse JSON in incoming requests
app.use(express.json());

// Use the product and cart routers for specific API routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Define a simple route for the homepage
app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send("Homepage");
});

// Set up a default error handler for routes not found
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
