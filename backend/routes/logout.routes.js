const express = require('express');
const router = express.Router();

const service = require("../service/logout.service")

router.get("/",service.logout);

module.exports = router