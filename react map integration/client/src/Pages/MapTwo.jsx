import React from 'react';
import {MapContainer, TileLayer, CircleMarker, Popup, Marker} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';  // Import leaflet to use L.icon
import markerIcon from '/images/marker.png';  // Import the marker image


export default function MapTwo() {

    // create the icon L.Icon and image
    const maerkerIcon = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [35, 45],
        iconAnchor: [17, 45],  // set the marker position properly (x, y)
        popupAnchor: [0, -45],  // Point where the popup will appear relative to the icon
    });

  return (
    <MapContainer center={[22.5744, 88.3629]} zoom={14} scrollWheelZoom={false}>
        <TileLayer attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' url='https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=xpL7wNLWmyhEZZoEtLXq'/>

        <CircleMarker center={[22.5744, 88.3629]} color='transparent' fillColor='blue'>
            <Popup>Your Location</Popup>
        </CircleMarker>

        <Marker position={[22.5754, 88.4798]}>
            <Popup>New Town</Popup>
        </Marker>
        <Marker position={[22.583979, 88.415482]}>
            <Popup>Bidhan Nagar</Popup>
        </Marker>
        <Marker position={[22.595770, 88.263641]}>
            <Popup>Howrah</Popup>
        </Marker>
        <Marker position={[22.5678, 88.3710]} icon={maerkerIcon}>
            <Popup>Sealdha</Popup>
        </Marker>

    </MapContainer>
    
  )
}
