import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -5.3966,  // Latitude default (Bandar Lampung)
  lng: 105.2327 // Longitude default (Bandar Lampung)
};

function TPSLocation() {
  const [tpsLocations, setTpsLocations] = useState([
    { id: 1, name: 'TPS UIN Sukarame', lat: -5.3966, lng: 105.2327 },
    { id: 2, name: 'TPS Morotai', lat: -5.3960, lng: 105.2330 },
    { id: 3, name: 'TPS Villa Citra', lat: -5.3965, lng: 105.2350 },
  ]);
  
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <h2>Lokasi Tempat Pembuangan Sampah (TPS) Terdekat</h2>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          {tpsLocations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div>
                <h4>{selectedLocation.name}</h4>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default TPSLocation;
