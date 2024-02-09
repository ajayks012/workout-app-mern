const router = require("express").Router();
const WorkoutModel = require("../models/workoutModel");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
} = require("../controller/workoutController");

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", (req, res) => {
  res.send("hi");
});
router.put("/:id", (req, res) => {
  res.send("hi");
});

module.exports = router;
