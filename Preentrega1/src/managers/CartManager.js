const fs = require('fs').promises;

class CartManager {
    constructor(filePath) {
        // Path to the file storing cart data
        this.path = filePath;
        // Array to store cart objects
        this.carts = [];

        // Load carts from file and handle promise resolution
        this.loadCarts().then((data) => {
            console.log("Loaded carts:", data);
            this.carts = data;
        }).catch((error) => {
            console.error(`Error loading carts: ${error.message}`);
        });
    }

    // Load carts from the specified file
    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // Return an empty array if there is an error reading the file
            return [];
        }
    }

    // Save carts to the specified file
    async saveCarts() {
        // Convert carts array to JSON format
        const data = JSON.stringify(this.carts, null, 2);
        // Write JSON data to the file
        await fs.writeFile(this.path, data);
        console.log(data);
    }

    // Generate a new unique cart ID
    generateCartId() {
        return this.carts.length > 0 ? Math.max(...this.carts.map(cart => cart.id)) + 1 : 1;
    }

    // Add a new cart with a generated ID to the carts array
    async addCart(newCart) {
        if (newCart.id) {
            throw new Error("Cannot manually specify the 'id' field");
        }

        const cart = {
            id: this.generateCartId(),
            products: []
        };

        this.carts.push(cart);
        await this.saveCarts();
    }

    // Get a cart by its ID
    async getCartById(id) {
        const cart = this.carts.find(cart => cart.id == id);
        if (!cart) {
            throw new Error(`No cart found with id ${id}`);
        }
        return cart;
    }

    // Get all carts
    async getAllCarts() {
        return this.carts;
    }

    // Add a product to a specified cart with a given quantity
    async addProductToCart(cartId, productId, quantity) {
        const cart = this.carts.find(cart => cart.id == cartId);
        if (!cart) {
            throw new Error(`No cart found with id ${cartId}`);
        }
        console.log(`Adding product ${productId} to cart ${cartId} with quantity ${quantity}`);
        // Check if the product already exists in the cart
        const existingProduct = cart.products.find(product => product.id === productId);

        if (existingProduct) {
            // If the product exists, update its quantity
            existingProduct.quantity += quantity;
        } else {
            // If the product is not in the cart, add it with the given quantity
            cart.products.push({ id: productId, quantity });
        }

        await this.saveCarts();
    }
}

// Export the CartManager class for use in other modules
module.exports = CartManager;
