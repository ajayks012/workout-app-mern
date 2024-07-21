require("dotenv").config();

const workoutRoutes = require("./routes/workouts.js");
const userRoutes = require("./routes/users.js");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow sending cookies with requests
  })
);

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/auth", userRoutes);

app.use("/workout", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log("running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.log("not connected", err));
