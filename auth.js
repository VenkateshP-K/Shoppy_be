const jwt = require('jsonwebtoken');
const User = require('./models/user');
const config = require('./config');

const Auth = {
    isAuth: async (req, res, next) => {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decodedToken = jwt.verify(token, config.JWT_SECRET);
            req.userId = decodedToken.userId;
            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);
            if (user.role !== 'Admin') {
                return res.status(403).json({ message: "UnAuthorized User" });
            }
            if (user.role === 'Admin') {
                next();
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = Auth