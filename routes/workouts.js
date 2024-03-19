const router = require("express").Router();
const {
  createWorkout,
  getWorkout,
  workoutByDate,
  deleteWorkout,
  updateWorkout,
  getWorkouts,
} = require("../controller/workoutController");

router.get("/", getWorkouts);

router.get("/filter", workoutByDate);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.put("/:id", updateWorkout);

module.exports = router;
