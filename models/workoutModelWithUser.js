const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  workouts: [
    {
      exercise: {
        type: String,
        required: true,
      },
      sets: [
        {
          reps: {
            type: Number,
            required: true,
          },
          weight: {
            type: Number,
            default: 0, // Default weight to 0 if not specified
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    required: true,
  },
});

const workoutSchemaModel = mongoose.model("workout", workoutSchema);

//Workouts collection is automatically created in the db
module.exports = workoutSchemaModel;
