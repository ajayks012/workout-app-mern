const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const workoutSchemaModel = mongoose.model("Workouts", workoutSchema);

//Workouts collection is automatically created in the db
module.exports = workoutSchemaModel;
