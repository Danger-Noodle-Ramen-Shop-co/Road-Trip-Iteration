import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { useGetDirectionQuery } from '../features/genSettings/apiSlice';
import { updateWaypoints } from '../features/genSettings/genSettingsSlice';


const WaypointContainer = () => {
  const origin = useSelector((state) => state.genSettings.origin);//grab all the neccasary pieces of state from the store
  const destination = useSelector((state) => state.genSettings.destination);
  const step = useSelector((state) => state.genSettings.step);
  const waypointStr = useSelector((state) => state.genSettings.waypointStr);
  const dispatch = useDispatch();
  
  
    const { data, error, isLoading } = useGetDirectionQuery({ origin, destination, waypointStr });

  if (isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;
  if (!data || data.routes.length === 0) return <div>No routes found.</div>;

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
      console.log(waypoints);
      dispatch(updateWaypoints(waypoints));
  
  
      
      return (
            <div style={styles.waypoints}>
              <h3>Waypoint List:</h3>
              <ul>
                {waypoints.length === 0 ? (
                  <li>No Waypoints Yet</li>
                ) : (
                  waypoints.map((waypoint, index) => <li key={index}>{waypoint}</li>)
                )}
              </ul>
            </div>
          );
  
        }





//Do we want to have individual "Waypoint" components
// const WaypointContainer = () => {
//   //Get the current waypoints from the state and render to UI
//   const waypoints = useSelector((state) => state.genSettings.waypoints);
//   return (
//     <div style={styles.waypoints}>
//       <h3>Waypoint List:</h3>
//       <ul>
//         {waypoints.length === 0 ? (
//           <li>No Waypoints Yet</li>
//         ) : (
//           waypoints.map((waypoint, index) => <li key={index}>{waypoint}</li>)
//         )}
//       </ul>
//     </div>
//   );
// };

//Waypoint style
const styles = {
  waypoints: {
    border: '1px solid black',
    display: 'flex',
    position: 'absolute',
    right: '20',
    height: '530px',
    width: '300px',
    flexDirection: 'column',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default WaypointContainer;
