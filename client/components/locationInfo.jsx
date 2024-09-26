import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import Settings from './settings';

const YOUR_API_KEY = process.env.API_KEY;

const LocationInfo = () => {
  // set state to updata location information
  const [locationData, setLocationData] = useState([]);
  //dummy data for waypoints
  const waypoints = [
    '37.7749,-122.4194', // San Francisco
    '37.7892,-122.4035', // Second chunk
    '37.8044,-122.2712', // Oakland
  ];

  // function to fetch nearby data
  const fetchNearbybyData = async (nearbyDataUrl) => {
    try {
      const response = await fetch(nearbyDataUrl);
      if (!response.ok) {
        throw new Error(
          'Network response in locationInfo.jsx on Fetch Nearby Data was not okay'
        );
      }
      const data = await response.json(); // parse response to JSON
      console.log('NearbyData', data);

      // store fetched data in state
      setLocationData((prevData) => [...prevData, ...data.results]); // append new location data to existing state
    } catch (error) {
      console.error('Error in locationInfo.jsx on Fetch Nearby Data', error);
    }
  };

  // fetch when mount
  useEffect(() => {
    waypoints.forEach((waypoint) => {
      const [latitude, longitude] = waypoint.split(','); // deconstruct waypoints to lat and log
      const radius = 1609.34; // Radius equal to 1 mile in meters
      const minprice = 0;
      const maxprice = 0.5;
      const type = 'restaurant'; // Fetch nearby restaurants

      const nearbyDataUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&minprice=${minprice}&maxprice=${maxprice}&key=${YOUR_API_KEY}`;

      fetchNearbybyData(nearbyDataUrl); // Call the API fetch function
    });
  }, []); // empty dependency array to fetch when components mount

  return null; // the UI render will be integrated in map.jsx using google map marker
};

export default LocationInfo;

// /*
// example response nearby location data is shown below in json
// data = {
//   "html_attributions": [],
//   "results": [
//     {
//       "business_status": "OPERATIONAL",
//       "geometry": {
//         "location": {
//           "lat": -33.8587323,
//           "lng": 151.2100055
//         }
//       },
//       "name": "Cruise Bar",
//       "rating": 4,
//       "place_id": "ChIJi6C1MxquEmsR9-c-3O48ykI",
//       "vicinity": "Level 1, 2 and 3, Overseas Passenger Terminal, Circular Quay W, The Rocks",
//       "photos": [
//         {
//           "photo_reference": "Aap_uECvJIZuXT-uLDYm4DPbrV7gXVPeplbTWUgcOJ6rnfc4bUYCEAwPU_AmXGIaj0PDhWPbmrjQC8hhuXRJQjnA1-iREGEn7I0ZneHg5OP1mDT7lYVpa1hUPoz7cn8iCGBN9MynjOPSUe-UooRrFw2XEXOLgRJ-uKr6tGQUp77CWVocpcoG",
//           "width": 1080,
//           "height": 608
//         }
//       ]
//     },
//     {
//       "business_status": "OPERATIONAL",
//       "geometry": {
//         "location": {
//           "lat": -33.8675219,
//           "lng": 151.2016502
//         }
//       },
//       "name": "Sydney Harbour Dinner Cruises",
//       "rating": 4.8,
//       "place_id": "ChIJM1mOVTS6EmsRKaDzrTsgids",
//       "vicinity": "32 The Promenade, Sydney"
//     }
//   ],
//   "status": "OK"
// }
// */
