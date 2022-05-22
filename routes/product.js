const express = require("express");
const productController = require("../controller/product");
const multer = require("multer");

const router = express.Router();
const authorization = require('../middleware/auth');

var storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addnewproduct", authorization, upload.single('image'), productController.newProduct);

router.get("/products/:productid", authorization, productController.seeProduct);

router.get("/delete/:productid", authorization, productController.deleteProduct);

router.get("/edit/:productid", authorization, productController.editProduct);

router.post("/updateproduct", authorization, upload.single('image'), productController.updateProduct);

router.get('/admin/allproducts', authorization, productController.allProduct);

module.exports = router;