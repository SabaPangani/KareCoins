const express = require("express");

const { createRequest, answerRequest } = require("../controllers/rewardRequest");

const router = express.Router();

router.post("/create", createRequest);
router.post("/answer-request", answerRequest);

module.exports = router;
