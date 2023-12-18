const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  contactNumber: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyId: {
    type: String,
    default: "",
  },
  departmentId: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["Admin", "Head", "User"],
    default: "Admin",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  totalCoin: {
    type: Number,
    default: 0,
  },
});

userSchema.statics.signup = async function (
  name,
  email,
  password,
  contactNumber,
  companyName
) {
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const existingUser = await this.findOne({
    $or: [{ email }, { name }, { contactNumber }],
  });

  if (existingUser) {
    throw new Error("Email, name, or contact number already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = this.create({
    name,
    contactNumber,
    email,
    password: hashedPassword,
    companyName,
  });

  return user;
};
userSchema.statics.addUser = async function (
  name,
  email,
  jobTitle,
  role,
  companyId,
  departmentId
) {
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error("Gmail already already exists!");
  }
  const user = await this.create({
    name,
    email,
    jobTitle,
    role,
    departmentId,
    companyId,
  });
  // const user = await this.findOneAndUpdate(
  //   { email: email },
  //   { $set: { departmentId: departmentId, role: role, jobTitle: jobTitle } },
  //   { new: true, useFindAndModify: false }
  // );

  return user;
};
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  return user;
};

userSchema.statics.deleteUser = async function (userId) {
  if (!userId) {
    throw new Error("Department id is missing");
  }
  const result = await this.deleteOne({ _id: userId });

  return result;
};
userSchema.statics.updateUser = async function (
  id,
  name,
  email,
  role,
  jobTitle,
  depId
) {
  if (!id || !name || !email || !role || !depId || !jobTitle) {
    throw new Error("Invalid credentials");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      name,
      email,
      role,
      departmentId: depId,
      jobTitle,
    },
  };
  const options = {
    returnDocument: "after",
  };
  const result = await this.findOneAndUpdate(filter, updateDoc, options);
  return result;
};

module.exports = mongoose.model("User", userSchema);
