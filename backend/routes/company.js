const express = require("express");

const { createCompany, getCompany } = require("../controllers/company");

const router = express.Router();

router.post("/create", createCompany);
router.get("/get", getCompany);

module.exports = router;
