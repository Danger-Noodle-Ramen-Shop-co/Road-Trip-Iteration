import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addWaypoint,
  updateDestination,
  updateOrigin,
  updateStep,
} from '../features/genSettings/genSettingsSlice';

const Settings = () => {
  //States for tracking journey from origin to destination
  // const origin = useSelector((state) => state.genSettings.origin);
  // const destination = useSelector((state) => state.genSettings.destination);
  // const step = useSelector((state) => state.genSettings.step);
  // const waypointStr = useSelector((state) => state.genSettings.waypointStr);

  const [origin, setOrigin] = useState('');//set's up local state
  const [destination, setDestination] = useState('');
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  //create a reference
  const inputRef = useRef(null);

  function handleChunk(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    //Dispatch add waypoint once form is submitted
    dispatch(addWaypoint(formJson.waypoints.replace(' ', '+')));
    //clears reference string
    inputRef.current.value = '';
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrigin(origin));
    dispatch(updateDestination(destination));
    dispatch(updateStep(step));
  }

  return (
    <div style={styles.settings}>
      <form style={styles.top} onSubmit={handleSubmit}>
        <label htmlFor='from'>From:</label>
        <input
          id='from'
          type='text'
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        ></input>

        <label htmlFor='to'>To:</label>
        <input
          id='to'
          type='text'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        ></input>
        <label htmlFor='steps'>Chunk Trip By Miles:</label>
        <input
          id='steps'
          type='number'
          value={step}
          onChange={(e) => setStep(e.target.value)}
        ></input>
        <button type='submit'
          // onClick={(e) => {//maybe switch to on submit so the state doesn't change everytime someone types so rtk querry works
          //   e.preventDefault();
          //   chunkRoute();
          // }}
        >
          Find Stops
        </button>
      </form>

      <form style={styles.bottom} onSubmit={handleChunk}>
        <label htmlFor='waypoints'>Stops You Want to Make:</label>
        <input
          type='text'
          //This will capture the the input to the text input to be cleared in the event handler
          ref={inputRef}
          id='waypoints'
          name='waypoints'
        ></input>
        <button style={styles.addWaypoint} type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

//14Ng5wZo9NNf9JEF
// mongodb+srv://sharonpatterson808:14Ng5wZo9NNf9JEF@cluster0.dfhsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const styles = {
  settings: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    flexDirection: 'column',
    position: 'relative',
  },
  top: {
    display: 'flex',
    gap: '5px',
  },
  bottom: {
    display: 'flex',
    gap: '5px',
  },
};

export default Settings;
