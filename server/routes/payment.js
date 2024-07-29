// Import the required modules
const express = require("express");
const router = express.Router();
const capturePayment = require("../controllers/payments");

router.post("/payment", capturePayment);

module.exports = router;
