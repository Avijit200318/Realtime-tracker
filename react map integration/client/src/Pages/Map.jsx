import React from 'react'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
// import leaflet css file otherwise it show multiple maps
// go to index.css and write


export default function Map() {
    return (
        <MapContainer center={[22.5744, 88.3629]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CircleMarker center={[22.5744, 88.3629]} radius={10} color='transparent' fillColor='blue' opacity={5}>
                <Popup>
                    <h1 className="">Kolkata</h1>
                </Popup>
            </CircleMarker>

            <Marker position={[22.5754, 88.4798]}>
                <Popup>
                    <h1 className="">hello</h1>
                </Popup>
            </Marker>
        </MapContainer>
    )
}
