const router = require("express").Router();
const {
  createWorkout,
  getUser,
  getUsers,
  deleteWorkout,
  updateWorkout,
} = require("../controller/userController");

router.get("/", getUsers);

router.get("/:email", getUser);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.put("/:id", updateWorkout);

module.exports = router;
