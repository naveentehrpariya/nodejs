const express = require('express');
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const authController = require('../controllers/authController');

router.route('/signup').post(authController.signup);

router.route('/login').post(authController.login); 

// router.route('/profile').get( authController.current_user);

module.exports = router; 
