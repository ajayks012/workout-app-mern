require("dotenv").config();

const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/users.js");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/", userRoutes);

app.use("/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log("running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log("not connected", err));
