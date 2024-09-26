import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
//import the store
const dispatch = useDispatch();
function savedTripsEl({origin, destination, step, waypointStr, waypoints}){
    const handleClick = (e) => {
        //make a post request fetch with all of the props on the req body 
        e.preventDefault();
        dispatch(updateOrigin(origin));
        dispatch(updateDestination(destination));
        dispatch(updateStep(step));
    }
    return(
        <div onClick={handleClick}>
            <p>{`Trip from ${origin} to ${destination} with ${step} steps`}</p>
            <p></p>
            {/* <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul> */}
        </div>
    )
}