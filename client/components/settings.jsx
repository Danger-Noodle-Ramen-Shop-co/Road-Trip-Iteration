//define waypoitns, chunks of the trip
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addWaypoint,
  updateDestination,
  updateOrigin,
  updateStep,
  updateWaypoints,
} from '../features/genSettings/genSettingsSlice';

const Settings = () => {
  //States for tracking journey from origin to destination
  const origin = useSelector((state) => state.genSettings.origin);
  const destination = useSelector((state) => state.genSettings.destination);
  const step = useSelector((state) => state.genSettings.step);
  const waypointStr = useSelector((state) => state.genSettings.waypointStr);
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

  //get waypointsstr will cost.
  function chunkRoute() {
    async function getData() {
      //Will need to add API key, figure out how to get
      //Fetching from the API the best directions (routes) between origin and destination and waypoints
      const response = await fetch(
        `/corsproxy/directions?url=https://maps.googleapis.com/maps/api/directions/json&key=${
          process.env.GOOGLE_API_KEY
        }&destination=${destination.replace(' ', '+')}&origin=${origin.replace(
          ' ',
          '+'
        )}${waypointStr}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      // console.dir(data);
      //    initialize waypoints array = []
      const waypoints = [];
      let totalDist = 0;
      //mile convert to meter
      const stepInMeters = step * 1609;
      //    iterate through legs array, set totalDist = 0
      //        iterate through each leg's steps array,
      console.log('num legs = ', data.routes[0].legs.length);
      console.log('num routes = ', data.routes.length);
      if (data.routes.length === 0) return;
      //only accumulate distance when passing the leg of the travel
      for (const leg of data.routes[0].legs) {
        for (const step of leg.steps) {
          // for each step, add its distance to the totalDist
          totalDist += step.distance.value;
          // if totalDist is greater than chunkLength:
          if (totalDist > stepInMeters) {
            // add the startLocation (place id maybe?) from the step to our own waypoints array
            waypoints.push(
              `${step.start_location.lat},${step.start_location.lng}`
            );

            // reset the totalDist to 0
            totalDist = 0;
          }
        }
      }
      console.dir(waypoints);
      dispatch(updateWaypoints(waypoints));
      //    include waypoints array into the embedded map src url
    }
    // check for step if its nothing, return early
    if (!step) return;
    // fetch request to routes api using origin and destination
    getData();
  }

  //14Ng5wZo9NNf9JEF
  // mongodb+srv://sharonpatterson808:14Ng5wZo9NNf9JEF@cluster0.dfhsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

  return (
    <div style={styles.settings}>
      <form style={styles.top}>
        <label htmlFor='from'>From:</label>
        <input
          id='from'
          type='text'
          value={origin}
          onChange={(e) => dispatch(updateOrigin(e.target.value))}
        ></input>

        <label htmlFor='to'>To:</label>
        <input
          id='to'
          type='text'
          value={destination}
          onChange={(e) => dispatch(updateDestination(e.target.value))}
        ></input>
      </form>

      <form style={styles.bottom}>
        <label htmlFor='steps'>Chunk Trip By Miles:</label>
        <input
          id='steps'
          type='number'
          value={step}
          onChange={(e) => dispatch(updateStep(e.target.value))}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            chunkRoute();
          }}
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
