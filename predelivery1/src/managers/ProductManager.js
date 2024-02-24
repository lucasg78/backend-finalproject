// Import the fs module with promises for file operations
const fs = require('fs').promises;

// Define a class for managing products
class ProductManager {
    // Constructor function to initialize the ProductManager
    constructor(path) {
        // Set the file path for storing product data
        this.path = path;
        // Array to store product objects
        this.products = [];
        // Load products from file and handle promise resolution
        this.loadProducts().then((data) => {
            this.products = data;
        }).catch((error) => {
            console.error(`Error loading products: ${error.message}`);
        });
    }

    // Asynchronous function to load products from the specified file
    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Return an empty array if there is an error reading the file
            return [];
        }
    }

    // Asynchronous function to save products to the specified file
    async saveProducts() {
        // Convert products array to JSON format with indentation
        const data = JSON.stringify(this.products, null, 2);
        // Write JSON data to the file
        await fs.writeFile(this.path, data);
    }

    generateId() {
        return this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
    }

    // Asynchronous function to add a new product to the array
    async addProduct(newProduct) {
        // Check if essential data fields are missing in the new product
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            console.error("Missing data");
            throw new Error("Missing data");
        }

        // Check for duplicate product code
        let duplicate = this.products.find(product => product.code === newProduct.code);
        if (duplicate) {
            console.warn(`The code already exists`);
            throw new Error(`The code ${newProduct.code} already exists`);
        }

        // Check if the product code is a number
        if (isNaN(Number(newProduct.code))) {
            console.warn("The code must be a number");
            throw new Error("The code must be a number");
        }

        // Create a new product object with an incremented ID
        const product = {
            id: this.generateId(),
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            code: newProduct.code,
            stock: newProduct.stock
        };

        // Add the new product to the products array
        this.products.push(product);
        // Save the updated products array to the file
        await this.saveProducts();
    }

    // Asynchronous function to get all products
    async getProducts() {
        return this.products;
    }

    // Asynchronous function to get a product by its ID
    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`No product found with id ${id}`);
        }
        return product;
    }

    // Asynchronous function to update a product by its ID with new data
    async updateProduct(id, updatedProduct) {
        // Find the index of the product in the array
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No product found with id ${id}`);
        }

        // Update the product with the new data
        this.products[index] = { ...this.products[index], ...updatedProduct };
        // Save the updated products array to the file
        await this.saveProducts();
    }

    // Asynchronous function to delete a product by its ID
    async deleteProduct(id) {
        // Find the index of the product in the array
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No product found with id ${id}`);
        }

        // Remove the product from the array
        this.products.splice(index, 1);
        // Save the updated products array to the file
        await this.saveProducts();
    }
}

// Export the ProductManager class for use in other modules
module.exports = ProductManager;
