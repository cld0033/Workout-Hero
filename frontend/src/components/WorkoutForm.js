import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const {user} = useAuthContext()

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

if (!user) {
  setError('You must be logged in')
  return
}

    const workout = { title, load, sets, reps };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle('');
      setLoad('');
      setSets('');
      setReps('');
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add an Exercise</h3>

      <label>Excercise:</label>
      <input
        type="text"
        onChange={(e) => {
          const words = e.target.value.split(' ');
          const capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          });
          setTitle(capitalizedWords.join(' '));
        }}
        value={title}
        className={emptyFields.includes('Exercise') ? 'error' : ''}
      />

      <label>Load (in lbs):</label>
      <input
        type="number"
        min="0"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('Load') ? 'error' : ''}
      />

      <label>Number of Sets:</label>
      <input
        type="number"
        min="0"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields.includes('Sets') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        min="0"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('Reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
