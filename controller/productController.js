const Product = require('../models/products')
const User = require('../models/user')

const productController = {
    createProduct: async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const userId = req.userId;

            // Verify user existence
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const newProduct = new Product({
                name,
                price,
                description,
                createdBy: userId,
            });

            const savedProduct = await newProduct.save();
            res.status(200).json({ message: 'Product created successfully', savedProduct });
        } catch (error) {
            console.error('Error in createProduct:', error);
            res.status(500).json({ message: error.message });
        }
    },

    //get all products
    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json({ products });
        } catch (error) {
            console.error('Error in getProducts:', error);
            res.status(500).json({ message: error.message });
        }
    },

    //get product by id
    getProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ product });
        }
        catch (error) {
            console.error('Error in getProduct:', error);
            res.status(500).json({ message: error.message });
        }
    },

    //update product
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.productId;

            const updatedProduct = await Product.findByIdAndUpdate(
                productId, req.body,
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product updated successfully', updatedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //delete product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const deletedProduct = await Product.findByIdAndDelete(productId);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //add product to cart
    addToCart : async (req,res) => {
       try{
        const productId = req.params.productId;
        const userId = req.userId;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart.push(productId);        
        await user.save();
        res.status(200).json({ message: 'Product added to cart successfully' });
       }
       catch (error) {
        res.status(500).json({ message: error.message });
       }       
    },

    //remove product from cart
    removeFromCart : async (req,res) => {
        try{
            const productId = req.params.productId;
            const userId = req.userId;
            
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const index = user.cart.indexOf(productId);
            if (index === -1) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }

            user.cart.splice(index, 1);        
            await user.save();
            res.status(200).json({ message: 'Product removed from cart successfully' });
           }       
           catch (error) {
            res.status(500).json({ message: error.message });
           }       
    },
    
    //get all products in cart
    getCart : async (req,res) => {
        try{
            const userId = req.userId;
            
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const products = await Product.find({ _id: { $in: user.cart } });
            res.status(200).json({ products });
           }       
           catch (error) {
            res.status(500).json({ message: error.message });
           }       
    }
}

module.exports = productController;