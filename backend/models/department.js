const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
  },
  companyId: {
    type: String,
  },
  totalCoin: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: String,
    required: true,
  },
});

departmentSchema.statics.createDepartment = async function (
  departmentName,
  companyId,
  user_id
) {
  if (!departmentName || !companyId) {
    throw new Error("All fields must be filled");
  }

  const depNameExists = await this.findOne({ departmentName });

  if (depNameExists) {
    throw new Error("department with this name already exists!");
  }

  const department = await this.create({
    departmentName,
    companyId,
    user_id,
  });

  return department;
};
departmentSchema.statics.deleteDepartment = async function (departmentId) {
  if (!departmentId) {
    throw new Error("Department id is missing");
  }
  const result = await this.deleteOne({ _id: departmentId });

  return result;
};
departmentSchema.statics.updateDepartment = async function (
  departmentId,
  departmentName
) {
  if (!departmentId || !departmentName) {
    throw new Error("Department id or department name missing");
  }

  const filter = { _id: departmentId };
  const updateDoc = {
    $set: {
      departmentName,
    },
  };
  const options = {
    returnDocument: "after",
  };
  const result = await this.findOneAndUpdate(filter, updateDoc, options);
  return result;
};

module.exports = mongoose.model("Department", departmentSchema);
