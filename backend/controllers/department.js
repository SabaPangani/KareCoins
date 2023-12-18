const Department = require("../models/department");
const createDepartment = async (req, res) => {
  const { departmentName, companyId } = req.body;
  try {
    const userId = req.userId;
    const department = await Department.createDepartment(
      departmentName,
      companyId,
      userId
    );
    res.status(200).json({ success: true, department: department });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const user_id = req.userId;
    const departments = await Department.find({ user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, departments: departments });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateDepartment = async (req, res) => {
  const { departmentName, departmentId } = req.body;

  try {
    const department = await Department.updateDepartment(
      departmentId,
      departmentName
    );
    res.status(200).json({ success: true, department });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  const { departmentId } = req.body;
  console.log(departmentId);
  try {
    const dep = await Department.deleteDepartment(departmentId);
    res.status(200).json({ success: true, deletedDep: dep });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  deleteDepartment,
  updateDepartment,
};
