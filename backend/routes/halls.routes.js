const express = require('express');
const router = express.Router();

const service = require("../service/halls.service")
const verify = require("../middleware/verifyJWT");

router.get("/:movie",service.getHalls);

router.post("/",service.hallDetails);
router.get("/hall/:id",service.getHallDetails);
router.post("/hallExist",verify,service.getHall);
router.post("/addMovies",service.addMovies);

module.exports = router;