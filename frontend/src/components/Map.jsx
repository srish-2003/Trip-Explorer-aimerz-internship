import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Routing = ({ waypoints }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || !waypoints || waypoints.length < 2) return;
    const leafletWaypoints = waypoints.map(wp => L.latLng(wp.coordinates.lat, wp.coordinates.lng));
    const routingControl = L.Routing.control({
      waypoints: leafletWaypoints,
      routeWhileDragging: false,
      lineOptions: { styles: [{ color: '#6FA1EC', weight: 4 }] },
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);
    return () => { if (map && routingControl) map.removeControl(routingControl); };
  }, [map, waypoints]);
  return null;
};

const Map = ({ waypoints }) => (
  <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%', borderRadius: '8px' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
    {waypoints && waypoints.length >= 2 && <Routing waypoints={waypoints} />}
  </MapContainer>
);

export default Map;