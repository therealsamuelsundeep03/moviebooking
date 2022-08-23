const express = require('express');
const router = express.Router();
 
const service = require("../service/refreshToken.service");

router.get("/",service.refreshToken);

module.exports = router;