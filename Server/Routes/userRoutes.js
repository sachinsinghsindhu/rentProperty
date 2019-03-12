const express = require('express');
let userRoutes = express.Router();
const userController = require('../Controllers/userController');

userRoutes.get('/login', userController.loginController);

userRoutes.post('/signup', userController.signUpController);

module.exports = userRoutes;