const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status : {
        type: Boolean,
        default: true
    },
    customers : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;