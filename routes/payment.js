const express = require("express");
const paymentController = require("../controller/payment");
const authorization = require('../middleware/auth');
const router = express.Router();

router.post("/makepayment", paymentController.makePayment);
router.get("/allpayment",authorization,paymentController.allPayment);
router.get("/deletepy/:pyid",authorization,paymentController.deletePayment);

module.exports = router;