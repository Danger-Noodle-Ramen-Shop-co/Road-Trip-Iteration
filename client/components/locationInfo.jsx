//map api is done, map = id, accessing all components apart via the display tutorials..

//assuming front end to send request to post or get trip info -> waypoints, point of location
//full feature: show locations you can stop at on that route (new york to boston), the restaurant, motel,
//minimum: waypoints on the travel bar
//david: update that state
//i'll display that state, which is to Display location info on the front end

//fetch
//1. response data how does it look like?
//google's destination route document to FIND WAYPOINTS DATA
//waypoint information -> resto, motel

//2. which container am i displaying
//the display will be related to map.jsx (on map), settings.jsx(waypoints/stops)
//waypoints is when we fetch the location info and display the content
//there will be resto, motel, etc. info show up in the map container when user click into that specific waypoint location
//when the user tap into that location (motel), it will show the motel's info
//address, description, cell phone

//3. my procedure
// user stories:
// - click that specific information - get information through response data - display the response data
// - part 1: nearby location api to get nearby location (caution to charge)
// - part 1: location information api to get location information
// - part 2: response data manipulation and display display
//      - use the react google map example to make markers
//      - the example wont run without api key

//request -> object with location info and description and etc.
// choose one at random, choose highest rating one
// display using tags using the map
// advanced marker: react components i can use to make markers on the certain location
//visual tutorials
// https://developers.google.com/codelabs/maps-platform/maps-platform-101-react-js#0
//market of lat,log, the place, get an object, and display, they can see.

//search api:
//limit to a small radius (.5 miles)becasuse it will return everything inside of that range
//if >=2000-3000 data points, 20 bucks

//--------
import React from 'react';
import Settings from 'Settings';

//curl foro the get nearby location
YOUR_API_KEY = 'AIzaSyCJvvolV8wIEeYGnzv2DjMDGP--LnCRRWI';

//ensure waypoints look like below
waypoints = [
  '37.7749,-122.4194', // San Francisco (first chunk)
  '37.7892,-122.4035', // Second chunk of the trip
  '37.8044,-122.2712', // Oakland (third chunk)
];

//location = latitude,longitude
waypoints.forEach((waypoint) => {
  const [latitude, longitude] = waypoint.split(','); //split the string via the comma
  console.log('waypoint location lat, log:', latitude, longitude);
});

radius = 1609.34; //radius equal to 1 mile, which is 1609.34 meters

//optional parameter on http request
minprice = 0;
maxprice = 0.5;
type = restaurant; //type of places, only one is applicable, we decide to fetch near by resto first

const nearbyDataUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${YOUR_API_KEY}`;

async function fetchNearbybyData() {
  try {
    const response = await fetch(nearbyDataUrl);
    if (!response.ok) {
      throw new Error(
        'Network response in locationInfo.jsx on Fetch Nearby Data was not okay'
      );
    }
    const data = await response.json(); //return json format in response
    console.log('NearbyData', data);
  } catch (error) {
    console.error('error in locationInfo.jsx on Fetch Nearby Data', error);
  }
}
