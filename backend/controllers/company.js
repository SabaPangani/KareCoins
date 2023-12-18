const Company = require("../models/company");

const createCompany = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const company = await Company.createCompany(name);
    res.status(200).json({ company });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getCompany = async (req, res) => {
  const { name } = req.body;
  try {
    const company = await Company.findOne({ name });
    res.status(200).json({ id: company._id, name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { createCompany, getCompany };
