const express = require('express');
let userRoutes = express.Router();
const userController = require('../Controllers/userController');

userRoutes.get('/login', userController.loginController);

userRoutes.post('/signup', userController.signUpController);

// userRoutes.get('/personalProperty', userController.getProperty);

userRoutes.post('/addProperty', userController.addProperty);

userRoutes.post('/addProfilePic', userController.addProfilePic);

module.exports = userRoutes;