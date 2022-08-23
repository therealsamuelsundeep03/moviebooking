const express = require('express');
const router = express.Router();

const service = require("../service/login.service")

router.post("/",service.findUser);

module.exports = router