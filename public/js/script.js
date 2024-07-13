const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
}

// leaflet code
const map = L.map("map").setView([0, 0], 10);
// [0, 0] -> center and 10 is zoom value

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "openStreetMap"
}).addTo(map)


const markers = {};


socket.on("recive-location", (data) => {
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude], 10);
})