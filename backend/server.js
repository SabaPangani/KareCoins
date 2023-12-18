require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const rewardRoutes = require("./routes/rewardRequest");
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const depRoutes = require("./routes/department");
const cors = require("cors");
const { default: helmet } = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use("/api/request", rewardRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/department", depRoutes);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening to port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
