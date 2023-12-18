const express = require("express");

const {
  createDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment,
} = require("../controllers/department");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.post("/create", createDepartment);
router.get("/get", getDepartments);
router.delete("/delete", deleteDepartment);
router.put("/update", updateDepartment);

module.exports = router;
