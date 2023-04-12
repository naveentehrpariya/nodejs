const express = require('express');
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { addproducts, listProducts, productDetail } = require(`../controllers/productsController`);

// TOKEN VALIDATOR
// router.use(validateToken); 

// API ROUTES
router.route('').post(addproducts).get(listProducts);

router.route('/:id').get(productDetail);

module.exports = router; 
