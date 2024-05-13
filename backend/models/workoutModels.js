//schema for how workout documents should look
//Schema defines the structure of a document inside our database
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
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
    sets: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// a model applies that schema to a particular model
module.exports = mongoose.model('Workout', workoutSchema);
