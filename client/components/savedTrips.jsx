import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//retrieve the necesarry start
const saveCount = useSelector((state) => state.genSettings.saveCount)
//for every object in the arr 
    //create a savedTripEl with props being el


const SavedTrips = () => {
    //make get request
        //creatr a savedTrips element for everything in the database
    const [ savedTrips, setSavedTrips ] = useState([]);
    
    useEffect(() => {
        //write out the fetch logic and once we get a response update savedTrips state
    }),[saveCount]

    return(
        <div style={styles.savedBox}>
            <h3>Saved Trips:</h3>
            {/* <button>refresh trips</button> */}
            Trip to Texas!
            <br></br>
            ...
        </div>
    )
}


const styles = {
    savedBox: {
        border: '1px solid black',
        width: '300px',
        height: '530px',
        margin: 'auto 0',
        padding: '10px',
        borderRadius: '5px'
    }
}

export default SavedTrips;