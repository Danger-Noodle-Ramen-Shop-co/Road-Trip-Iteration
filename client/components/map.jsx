import React from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';
import LocationInfo from './locationInfo';

/*const Map = () => {
  const destination = useSelector(
    (state) => state.genSettings.destination
  ).replace(/\s/, '+');
  const origin = useSelector((state) => state.genSettings.origin).replace(
    /\s/,
    '+'
  );
  const waypointStr = useSelector((state) => state.genSettings.waypointStr);
  //this will only fetch map, destination and origin, dont cost
  const url =
    destination === '' || origin === ''
      ? `https://www.google.com/maps/embed/v1/view?key=${process.env.GOOGLE_API_KEY}&center=39.828175,-98.5795`
      : `https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_API_KEY}=&origin=${origin}&destination=${destination}${waypointStr}`;
  return <iframe style={styles.map} src={url}></iframe>;
};*/

//function GoogleMap() {
/*const loader = new Loader({
    apiKey: process.env.GOOGLE_API_KEY,
    version: weekly,
  });
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary('maps');

    const map = new Map();
  });*/

// commented out dummy data
// const locations = [
//   { key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108 } },
//   { key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 } },
//   { key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 } },
//   { key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 } },
//   { key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 } },
//   { key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 } },
//   { key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 } },
//   { key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 } },
//   { key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 } },
//   { key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 } },
//   { key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 } },
//   {
//     key: 'kingStreetWharf',
//     location: { lat: -33.8665445, lng: 151.1989808 },
//   },
//   { key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 } },
//   { key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 } },
//   { key: 'barangaroo', location: { lat: -33.8605523, lng: 151.1972205 } },
// ];

function GoogleMap() {
  const waypoints = useSelector((state) => state.genSettings.waypoints);
  console.log(waypoints);
  return (
    <APIProvider
      apiKey={process.env.GOOGLE_API_KEY}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <Map
        mapId='bab950e9b992dd8c'
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      >
        <PoiMarkers pois={locations} />
      </Map>
    </APIProvider>
  );
}

function PoiMarkers({ pois }) {
  return (
    <>
      {pois.map((poi) => {
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>;
      })}
    </>
  );
}

const styles = {
  map: {
    width: '670',
    height: '420',
  },
};

export default GoogleMap;
