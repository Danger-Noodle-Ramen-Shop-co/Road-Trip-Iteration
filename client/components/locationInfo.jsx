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

data.results.forEach((place) => {
  const name = place.name;
  const rating = place.rating;
  const address = place.vicinity;
  const businessStatus = place.business_status;
  //use google photo api to fetch photos using photo reference
  //const photoreference = place.photos? place.photos[0]: 'No Photos';

});

/*
example response nearby location data is shown below in json 
data = {
  "html_attributions": [],
  "results": [
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": -33.8587323,
          "lng": 151.2100055
        }
      },
      "name": "Cruise Bar",
      "rating": 4,
      "place_id": "ChIJi6C1MxquEmsR9-c-3O48ykI",
      "vicinity": "Level 1, 2 and 3, Overseas Passenger Terminal, Circular Quay W, The Rocks",
      "photos": [
        {
          "photo_reference": "Aap_uECvJIZuXT-uLDYm4DPbrV7gXVPeplbTWUgcOJ6rnfc4bUYCEAwPU_AmXGIaj0PDhWPbmrjQC8hhuXRJQjnA1-iREGEn7I0ZneHg5OP1mDT7lYVpa1hUPoz7cn8iCGBN9MynjOPSUe-UooRrFw2XEXOLgRJ-uKr6tGQUp77CWVocpcoG",
          "width": 1080,
          "height": 608
        }
      ]
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": -33.8675219,
          "lng": 151.2016502
        }
      },
      "name": "Sydney Harbour Dinner Cruises",
      "rating": 4.8,
      "place_id": "ChIJM1mOVTS6EmsRKaDzrTsgids",
      "vicinity": "32 The Promenade, Sydney"
    }
  ],
  "status": "OK"
}
*/
