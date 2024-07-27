import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function Map() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
      });
    }
  }, []);

  if (!lat || !lon) {
    return <h1>Loading...</h1>;
  }

//   add routing
  const Routing = ({ lat, lon })=> {
    const map = useMap();
  
    useEffect(() => {
      if (lat && lon) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, lon),
            L.latLng(22.5678, 88.3710)
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: 'blue', weight: 4 }]
          },
        //createMarker: () => null, Removes default markers if markers alredy set then use default markers null.
        addWaypoints: false, // Prevents adding waypoints on click
        show: false // Hides the itinerary panel
        }).addTo(map);
      }
    }, [lat, lon, map]);
  
    return null;
  }

  return (
    <MapContainer center={[lat, lon]} zoom={14} scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={[lat, lon]} />

      <Marker position={[lat, lon]}>
        <Popup>
          <h1 className="">My Location</h1>
        </Popup>
      </Marker>

      <Routing lat={lat} lon={lon} />
    </MapContainer>
  );
}
