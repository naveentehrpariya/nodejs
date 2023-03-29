const express = require('express');
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { addproducts, listProducts } = require(`../controllers/productsController`);

// TOKEN VALIDATOR
router.use(validateToken); 

// API ROUTES
router.route('/add').post(addproducts);
router.route('/list').get(listProducts);

module.exports = router; 
