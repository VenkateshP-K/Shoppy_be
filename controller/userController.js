const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const userController = {
    //create a new user
    Register: async (req, res) => {
        try {
            const { username, email, password, location, role } = req.body;
            const user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ message: "User already exists" })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                location,
                role
            })

            await newUser.save()
            return res.status(201).json({ message: "User created successfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    //login user
    LogIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
    
            const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '24h' });
    
            // Set the cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
    
            // Send the token in the response body as well
            res.status(200).json({ message: "Login successful", token, user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //get user
    GetMe: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            console.error('Error in getMe:', error);
            res.status(500).json({ message: error.message });
        }
    },

    //logout user
    Logout: async (req, res) => {
        try {
            res.clearCookie('token');
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error('Error in logout:', error);
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = userController;