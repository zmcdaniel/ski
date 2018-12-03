const express = require("express");
const router = express.Router();

const resortController = require("../controllers/resort.controller");

router.get('/test', resortController.test);

module.exports = router;