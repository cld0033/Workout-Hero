const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts);

// GET a single workouts
router.get('/:id', getSingleWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a new workout
// '/:id' is the id of the thing we want to delete
router.delete('/:id', deleteWorkout);

// UPDATE a new workout
router.patch('/:id', updateWorkout);

module.exports = router;
