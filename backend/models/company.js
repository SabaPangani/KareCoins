const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

companySchema.statics.findCompany = async function (name) {
  if (!name) {
    throw new Error("Name is required");
  }
  const company = await this.find({ name });

  return company;
};

companySchema.statics.createCompany = async function (name) {
  if (!name) {
    throw new Error("Name is required");
  }
  const nameExists = await this.findOne({ name });

  if (nameExists) {
    throw new Error("Name already exists");
  }

  const company = await this.create({ name });

  return company;
};

module.exports = mongoose.model("Company", companySchema);
