const router = require("express").Router();
const {
  // createWorkout,
  getWorkout,
  workoutByDate,
  updateWorkout,
  // getWorkouts,
} = require("../controller/workoutController");
const requireAuth = require("../middleware/requireAuth");
const {
  deleteWorkout,
  getWorkouts,
  createWorkout,
} = require("../controller/newWorkoutController");

router.use(requireAuth);

// router.get("/", getWorkouts);

router.get("/filter", workoutByDate);

router.get("/:userId", getWorkouts);

router.post("/create", createWorkout);

router.delete("/:workoutId", deleteWorkout);

router.put("/:id", updateWorkout);

module.exports = router;
