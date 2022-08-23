const express = require('express');
const router = express.Router();

const service = require("../service/booked.service");

// router.post("/",service.bookTickets);
router.get("/:movie/:hallname/:location/:time/:showDay/:language",service.getBookedSeats);
router.get("/:id",service.getBookedInfo);

module.exports = router;