const router = require("express").Router();
const {
  // createWorkout,
  getWorkout,
  workoutByDate,
  deleteWorkout,
  updateWorkout,
  // getWorkouts,
} = require("../controller/workoutController");
const requireAuth = require("../middleware/requireAuth");
const {
  getWorkouts,
  createWorkout,
} = require("../controller/newWorkoutController");

router.use(requireAuth);

// router.get("/", getWorkouts);

router.get("/filter", workoutByDate);

router.get("/", getWorkouts);

router.post("/create", createWorkout);

router.delete("/:id", deleteWorkout);

router.put("/:id", updateWorkout);

module.exports = router;
