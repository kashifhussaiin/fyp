import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import './main.css';

const Location = () => {
    const mapContainerRef = useRef(null); // Reference to the map container element
    let routeControl = useRef(null); // Reference to the route control

    useEffect(() => {
        if (!mapContainerRef.current) {
            console.error("Map container ref not found");
            return;
        }

        // Create Leaflet map
        const map = L.map(mapContainerRef.current); // Create map without initial view

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Set initial position
        const initialPosition = [33.77352901637044, 72.3609781265259];
        map.setView(initialPosition, 16); // Set map view to initial position with zoom level 16

        // Add blue marker for COMSATS Attock Campus
        const comsatsMarker = L.marker(initialPosition, {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
            })
        }).addTo(map);
        comsatsMarker.bindPopup("<b>COMSATS Attock Campus</b>").openPopup();

        // Add destination markers
        const destinations = [
            { name: "Destination 1", coordinates: [33.7716, 72.3580] },
            { name: "Destination 2", coordinates: [33.7740, 72.3572] },
            { name: "Destination 3", coordinates: [33.7731, 72.3598] }
        ];

        destinations.forEach(destination => {
            const marker = L.marker(destination.coordinates, {
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34]
                })
            }).addTo(map);
            marker.bindPopup(`<b>${destination.name}</b>`).openPopup();
        });

        // Function to handle click event on the map
        function handleClick(event) {
            const clickedCoordinates = event.latlng;

            // Remove existing route if exists
            if (routeControl.current) {
                map.removeControl(routeControl.current);
            }

            // Add routing control to the map
            routeControl.current = L.Routing.control({
                waypoints: [
                    L.latLng(initialPosition), // Start point
                    clickedCoordinates // End point
                ],
                routeWhileDragging: true,
                geocoder: L.Control.Geocoder.nominatim(),
                router: new L.Routing.OSRMv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                })
            }).addTo(map);
        }

        // Add event listener for click event on the map
        map.on('click', handleClick);

        return () => {
            map.remove(); // Remove map instance on component unmount
            map.off('click', handleClick); // Remove click event listener
        };
    }, []); // Empty dependency array ensures this effect runs only once after initial render

    return (
        <div className='main'>
            <div className="container-fluid" style={{ paddingTop: 22 }}>
                <div ref={mapContainerRef} style={{ margin: 'auto', width: '1200px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
            </div>
        </div>
    );
}

export default Location;
