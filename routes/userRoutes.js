const express = require('express');
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { login, signup, current_user } = require('../controllers/userController');

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/profile').get(validateToken, current_user);

module.exports = router; 
