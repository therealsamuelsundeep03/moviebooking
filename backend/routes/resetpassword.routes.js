const express = require('express');
const router = express.Router();

const service = require("../service/resetpassword.service")

router.put("/",service.resetPassword);

module.exports = router