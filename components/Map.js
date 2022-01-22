import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the searchResults object into the { latitude: 52.516272, longitude: 13.377722 } object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // The longitude and latitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 9,
  });

  return (
    <ReactMapGl
      mapStyle="mapbox://styles/oscarstrada/ckxamandy201v15rpwhqk4c84"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.976"
                height="17.118"
                viewBox="0 0 13.976 17.118"
              >
                <path
                  d="M6780.57,912.185l5.516-12.4v12.4Z"
                  transform="translate(-6779.658 -899.787)"
                  fill="#00bfc1"
                />
                <path
                  d="M6778.989,923.525h6.428v3.417h-3.5Z"
                  transform="translate(-6778.989 -909.824)"
                  fill="#00bfc1"
                />
                <path
                  d="M6797.244,913.89h-4.967V903.817Z"
                  transform="translate(-6784.608 -901.491)"
                  fill="#00bfc1"
                />
                <path
                  d="M6798.584,923.525l-2.775,3.417h-3.532v-3.417Z"
                  transform="translate(-6784.608 -909.824)"
                  fill="#00bfc1"
                />
              </svg>
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
  );
}

export default Map;
