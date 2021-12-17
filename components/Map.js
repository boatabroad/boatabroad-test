import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react/cjs/react.development';
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the searchResults object into the { latitude: 52.516272, longitude: 13.377722 } object
  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat
  }));

  // The longitude and latitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGl
      mapStyle='mapbox://styles/oscarstrada/ckxamandy201v15rpwhqk4c84'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'>📌
            </p>
          </Marker>

          {/* The popup that should show if we click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGl>
  )
};

export default Map
