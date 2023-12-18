const Reward = require("../models/rewardRequest");
const User = require("../models/user");
const Dep = require("../models/department");

const allocateCoins = async (receiver, dep, coinCount) => {
  receiver.totalCoin += +coinCount;
  dep.totalCoin += +coinCount;
  await receiver.save();
  await dep.save();
};

const createRequest = async (req, res) => {
  const { senderId, receiverId, coinCount, reason } = req.body;
  console.log(senderId, receiverId, coinCount, reason);
  try {
    const receiver = await User.findOne({ _id: receiverId });
    const dep = await Dep.findOne({ _id: receiver.departmentId });

    if (!receiver || !dep) {
      return res.status(404).json({ message: "User or department not found" });
    }

    console.log(dep);

    const reward = await Reward.createRequest(
      senderId,
      receiverId,
      coinCount,
      reason
    );

    if (reward.status === "Approved") {
      await allocateCoins(receiver, dep, coinCount);
    }

    res.status(200).json({ success: true, reward });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const answerRequest = async (req, res) => {
  const { requestId, adminId, action } = req.body;

  try {
    if (!requestId || !adminId || !action) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const reward = await Reward.findOne({ _id: requestId });

      if (!reward) {
        return res.status(404).json({ error: "Reward not found" });
      }

      const receiver = await User.findOne({ _id: reward.receiverId });
      const dep = await Dep.findOne({ _id: receiver.departmentId });

      if (!receiver || !dep) {
        return res.status(404).json({ error: "User or department not found" });
      }

      if (action === "approve" && reward.status !== "Approved") {
        reward.status = "Approved";
        await allocateCoins(receiver, dep, coinCount);
      } else if (action === "decline" && reward.status !== "Declined") {
        reward.status = "Declined";
      } else {
        return res
          .status(400)
          .json({ error: "Invalid action or reward already in that state" });
      }

      reward.approverId = adminId;

      await reward.save({ session });
      await session.commitTransaction();

      res.status(200).json({ reward });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createRequest, answerRequest };
