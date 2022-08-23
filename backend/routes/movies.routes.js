const express = require('express');
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");


const service = require("../service/movies.service");

router.get("/",service.sendMovies);

module.exports = router;