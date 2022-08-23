const express = require('express');
const router = express.Router();

const service = require("../service/signin.service");

router.post("/",service.signin);
router.get("/:id",service.signinlink)
module.exports = router
