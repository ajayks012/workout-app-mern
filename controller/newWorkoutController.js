const mongoose = require("mongoose");
const workoutModel = require("../models/workoutModelWithUser");
const dateFormatter = require("../util/functions");
const { response } = require("express");

// GET all workouts
const getWorkouts = async (req, res) => {
  const { userId } = req.params;
  const date = req.query.date ? req.query.date : dateFormatter(new Date());
  try {
    const workoutObj = await workoutModel.findOne({ userId, date });
    res.status(200).json(workoutObj?.workouts || []);
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
    const workout = await workoutModel.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout found" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const workoutByDate = async (req, res) => {
  try {
    const date = req.query.date;
    if (date) {
      const filterDate = new Date(date);
      const workout = await workoutSchemaModel.find({ date: filterDate });

      if (workout.length === 0) {
        return res.status(404).json({ error: "No such workout found" });
      }
      res.status(200).json(workout);
    } else {
      return res.status(400).json({ error: "Invalid Date" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// POST a workout
const createWorkout = async (req, res) => {
  const { userId, workouts } = req.body;

  const date = dateFormatter(new Date());
  try {
    const workout = await workoutModel.findOneAndUpdate(
      { userId, date }, // Filter: Find user by email
      { $push: { workouts } }, // Update: Add newFavorite to the favorites array
      { new: true, upsert: true, useFindAndModify: false } // Options: Return updated document, create new if not found, avoid deprecated warning
    );
    // const workout = await new workoutModel({
    //   userId,
    //   workouts,
    //   date: date,
    // }).save();

    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const { _id } = req.user;
  try {
    const result = await workoutModel.updateOne(
      { userId: _id.toString(), "workouts._id": workoutId },
      { $pull: { workouts: { _id: workoutId } } }
    );
    if (result.matchedCount > 0) {
      console.log("Workout removed successfully");
      res
        .status(200)
        .json({ msg: "Workout removed successfully", response: result });
    } else {
      console.log("No workout found with the provided id");
      res.status(404).json({ msg: "No workout found with the provided id" });
    }
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
    const workout = await workoutSchemaModel.findOneAndUpdate(
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
  workoutByDate,
};
