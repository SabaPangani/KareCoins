const express = require("express");

const { login, signup, addUser, deleteUser, updateUser, getUsers, getUser } = require("../controllers/user");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/addUser", addUser);
router.get("/get", getUsers);
router.post("/getUser", getUser);
router.delete("/delete", deleteUser);
router.put("/update", updateUser);

module.exports = router;
