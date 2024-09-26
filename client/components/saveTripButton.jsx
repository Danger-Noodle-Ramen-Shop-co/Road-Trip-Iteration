import { response } from 'express';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSaveCount } from '../features/genSettings/genSettingsSlice'

const origin = useSelector((state) => state.genSettings.origin);//grab all the neccasary pieces of state from the store
const destination = useSelector((state) => state.genSettings.destination);
const step = useSelector((state) => state.genSettings.step);
const waypointStr = useSelector((state) => state.genSettings.waypointStr);
const waypoints = useSelector((state) => state.genSettings.waypoints);

const dispatch = useDispatch()
const SaveTripButton = () => {
    // const [trips, setTrips] = useState([]);
    const handleSubmit = async() => {
        //make a fetch post request to /main sending origin, destination, step, waypointStr, and waypoints on the body
        try {
            const response = await fetch('https://your-backend-endpoint.com/api', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Ensures the backend knows it's receiving JSON
              },
              body: JSON.stringify({
                origin,
                destination,
                step,
                waypointStr,
                waypoints,
              }),
            })
            dispatch(updateSaveCount())
            /*.unwrap()
            .then((data) => save retrieved data to storedList state slice)*/ ;
            if (!response.ok) {
              throw new Error('Request failed');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
    return (
        <button type='submit' onSubmit={handleSubmit}>Save Trip</button>
    )
}

export default SaveTripButton