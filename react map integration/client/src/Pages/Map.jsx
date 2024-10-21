import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
import 'leaflet-routing-machine';
import Routing from '../components/Routing';

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
  const [destinationLat, setDestinationLat] = useState(null);
  const [destinationLon, setDestinationLon] = useState(null);
  console.log("destinationLat:", destinationLat);

  const allLocation = [
    { name: "Howrah", lat: 22.595770, lon: 88.263641 },
    { name: "Sealdah", lat: 22.5678, lon: 88.3710 },
    { name: "Bidhan Nagar", lat: 22.5915, lon: 88.3908 }
  ];

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

  const setDestinationLatLon = (name, lat, lon) => {
    console.log(name);
    console.log("destination", lat, lon);
    setDestinationLat(lat);
    setDestinationLon(lon);
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
          My Location
        </Popup>
      </Marker>

{/* using tooltip to show name of the place. if we want to always to show the name of the place then we can use 'permanent'*/}
      {/* <Marker position={[22.5915, 88.3908]}>
        <Tooltip>
          Bidhan Nagar
        </Tooltip>
      </Marker> */}

      {allLocation.length !== 0 && (
      allLocation.map((data) =>
        <Marker key={data.name} position={[data.lat, data.lon]} eventHandlers={{ click: () => setDestinationLatLon(data.name, data.lat, data.lon) }}>
        <Tooltip permanent>
          {data.name}
        </Tooltip>
      </Marker>
      )  
      )}

      {(destinationLat && destinationLon) && <Routing lat={lat} lon={lon} desLat={destinationLat} desLon={destinationLon} />
      }
    </MapContainer>
  );
}
