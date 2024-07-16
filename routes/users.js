const router = require("express").Router();
// const {
//   createWorkout,
//   getUser,
//   getUsers,
//   deleteWorkout,
//   updateWorkout,
// } = require("../controller/userController");
const {
  loginUser,
  signupUser,
} = require("../controller/workoutUserController");

// router.get("/", getUsers);

// router.get("/:email", getUser);

// router.post("/", createWorkout);

// router.delete("/:id", deleteWorkout);

// router.put("/:id", updateWorkout);

router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;
