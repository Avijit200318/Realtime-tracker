import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

export default function Routing({ lat, lon, desLat, desLon}) {
    const map = useMap();
    const routingControlRef = useRef(null); // Reference to hold the routing control instance

    useEffect(() => {
        if (lat && lon && desLat && desLon) {
            // Remove existing routing control if present
            if (routingControlRef && routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }

            // Create and add new routing control
            const newRoutingControl = L.Routing.control({
                waypoints: [
                    L.latLng(lat, lon),
                    L.latLng(desLat, desLon)
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [{ color: 'blue', weight: 4 }]
                },
                createMarker: () => null,
                addWaypoints: false,
                show: false
            }).addTo(map);

            // Store the new routing control instance
            routingControlRef.current = newRoutingControl;
        }
    }, [lat, lon, desLat, desLon, map]);

    return null;
}
