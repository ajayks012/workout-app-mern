const WorkoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// GET single workout
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout found" });
    }
    const workout = await WorkoutModel.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// POST a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await WorkoutModel.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout found" });
    }
    const workout = await WorkoutModel.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: "No such workout found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// PATCH a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout found" });
    }
    const workout = await WorkoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res.status(404).json({ error: "No such workout found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
