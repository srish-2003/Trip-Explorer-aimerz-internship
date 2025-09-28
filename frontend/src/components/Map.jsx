import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Routing component with smooth updates
const Routing = ({ waypoints }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !waypoints || waypoints.length < 2) return;

    const leafletWaypoints = waypoints.map(
      (wp) => L.latLng(wp.coordinates.lat, wp.coordinates.lng)
    );

    // Create routing control only once
    if (!routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: leafletWaypoints,
        routeWhileDragging: false,
        draggableWaypoints: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: { styles: [{ color: '#6FA1EC', weight: 4 }] }
      }).addTo(map);
    } else {
      // Animate waypoint update
      const currentWaypoints = routingControlRef.current.getWaypoints();

      // Gradually update waypoints to new positions
      leafletWaypoints.forEach((newWp, i) => {
        if (
          !currentWaypoints[i] ||
          currentWaypoints[i].latLng.lat !== newWp.lat ||
          currentWaypoints[i].latLng.lng !== newWp.lng
        ) {
          currentWaypoints[i] = { ...currentWaypoints[i], latLng: newWp };
        }
      });

      routingControlRef.current.setWaypoints(currentWaypoints);
    }

    // Cleanup on unmount
    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (err) {
          console.warn('Routing control removal failed:', err);
        }
        routingControlRef.current = null;
      }
    };
  }, [map, waypoints]);

  return null;
};

// Main Map component
const Map = ({ waypoints }) => (
  <MapContainer
    center={[20.5937, 78.9629]}
    zoom={5}
    style={{ height: '100%', width: '100%', borderRadius: '8px' }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    />
    {waypoints && waypoints.length >= 2 && <Routing waypoints={waypoints} />}
  </MapContainer>
);

export default Map;
