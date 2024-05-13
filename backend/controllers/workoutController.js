/* controllers to get, post, delete, and patch routes */

const Workout = require('../models/workoutModels');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};
// get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  //check to see if valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such Workout' });
  }

  const singleWorkout = await Workout.findById(id);
  // if workout cant be found fire error message
  if (!singleWorkout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(singleWorkout);
};
// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push('Exercise');
  }
  if (!load) {
    emptyFields.push('Load');
  }
  if (!reps) {
    emptyFields.push('Reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: `Please fill in the following fields: ${emptyFields.join(', ')}`,
      emptyFields,
    });
  }
  //add doc to db
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such Workout' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: 'No Such Workout' });
  }

  res.status(200).json(workout);
};
//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such Workout' });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: 'No Such Workout' });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
