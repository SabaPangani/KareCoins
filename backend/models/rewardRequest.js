const mongoose = require("mongoose");

const rewardTransactionSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  coinCount: {
    type: Number,
    required: true,
  },
  approverId: {
    type: String,
    default: "",
  },
  approvalDate: {
    type: Date,
    default: Date.now,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Approved", "Pending", "Declined"],
    default: "Pending"
  },
});

rewardTransactionSchema.statics.createRequest = async function (
  senderId,
  receiverId,
  coinCount,
  reason
) {
  try {
    const rewardRequest = await this.create({
      senderId,
      receiverId,
      coinCount,
      reason,
    });
    return rewardRequest;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = mongoose.model("Reward", rewardTransactionSchema);
