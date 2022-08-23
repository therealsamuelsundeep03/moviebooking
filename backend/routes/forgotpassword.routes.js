const express = require('express');
const router = express.Router();

const service = require("../service/forgotpassword.service")

router.post("/",service.confirmationEmailForForgotPassword);
router.get("/:id",service.confirmStringForForgotPassword)

module.exports = router