const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    cart: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;