const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');
const Auth = require('../auth');

userRouter.post('/register', userController.Register);
userRouter.get('/me', Auth.isAuth, userController.GetMe);
userRouter.post('/login', Auth.isAuth,userController.LogIn);
userRouter.post('/logout', Auth.isAuth, userController.Logout);

module.exports = userRouter;