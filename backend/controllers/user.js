const User = require("../models/user");
const Dep = require("../models/department");
const Company = require("../models/company");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.login(email, password);
    const companyId = user.companyId;
    const token = createToken(user._id);
    res.status(200).json({ email, companyId, token, userId: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password, contactNumber, companyName } = req.body;

  try {
    const company = await Company.findOne({ name: companyName });
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }
    const companyId = company._id;
    const user = await User.signup(
      name,
      email.toLowerCase(),
      password,
      contactNumber,
      companyName
    );

    user.companyId = companyId;

    await user.save();

    res.status(200).json({ name, email, password, contactNumber, companyName });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  const { userName, userEmail, departmentName, userRole, jobTitle, companyId } =
    req.body;
  try {
    const dep = await Dep.findOne({ departmentName });

    if (!dep) {
      return res.status(404).json({ message: "Department not found" });
    }
    const depId = dep._id;

    const user = await User.addUser(
      userName,
      userEmail,
      jobTitle,
      userRole,
      companyId,
      depId
    );

    return res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { userId, userName, userEmail, userRole, departmentName, jobTitle } =
    req.body;

  console.log(userId, userName, userEmail, userRole, departmentName, jobTitle);
  try {
    const dep = await Dep.findOne({ departmentName });
    console.log(dep, dep._id, " department")
    if (!dep) {
      return res.status(404).json({ error: "Department not found" });
    }
    const depId = dep._id;
    const user = await User.updateUser(
      userId, 
      userName,
      userEmail,
      userRole,
      jobTitle,
      depId
    );
    
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.deleteUser(userId);
    res.status(200).json({ success: true, deletedUser: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
module.exports = {
  login,
  signup,
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
