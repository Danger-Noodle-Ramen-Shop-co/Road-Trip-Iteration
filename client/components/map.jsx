import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//import { Loader } from '@googlemaps/js-api-loader';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import LocationInfo from './locationInfo';

function GoogleMap() {
  const [locationData, setLocationData] = useState([]);
  //using React-Redux’s useSelector hook to access data from the Redux store.
  const waypoints = useSelector((state) => state.genSettings.waypoints);
  console.log(waypoints);

  return (
    <APIProvider
      apiKey={process.env.GOOGLE_API_KEY}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      {/* fetch location data using setLocationData */}
      <LocationInfo setLocationData={setLocationData} />
      <Map
        mapId='bab950e9b992dd8c'
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      >
        {/* pass locationData to poisMarker */}
        <PoiMarkers pois={locationData} />
      </Map>
    </APIProvider>
  );
}

function PoiMarkers({ pois }) {
  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.place_id} // ensure place_id exists or use another unique key
          position={{
            lat: poi.geometry.location.lat, //lat and lng are dynamically changing when markers change
            lng: poi.geometry.location.lng,
          }}
        >
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  );
}

export default GoogleMap;
