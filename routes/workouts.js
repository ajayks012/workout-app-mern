const router = require("express").Router();
const WorkoutModel = require("../models/workoutModel");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controller/workoutController");

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.put("/:id", updateWorkout);

module.exports = router;
