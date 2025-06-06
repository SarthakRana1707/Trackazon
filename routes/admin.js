const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin/products');
//  admin/add-product
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit', adminController.getEditProduct);
router.post('/edit', adminController.postEditProduct);
router.get('/delete', adminController.getDeleteProduct);
router.get('/deletereview', adminController.getDeleteReview);
module.exports=router;