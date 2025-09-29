/**
 * @fileoverview * CreateTrip component allows users to plan and create a custom road trip
  * Users can specify a trip title, description, start point, destination,
 * and multiple waypoints. The component fetches coordinates using OpenStreetMap
 * and visualizes the route on a map. Upon submission, the trip is sent
 * to the backend API with authentication.
 *
 * Features:
 * - Controlled inputs for title, description, start point, destination, and waypoints
 * - Fetches latitude and longitude for all locations via OpenStreetMap API
 * - Displays a live map preview of the trip route
 * - Handles POST request to create a trip in the backend
 * - Provides success or error messages
 
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Map from '../components/Map';

const CreateTrip = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startPoint, setStartPoint] = useState({ name: '', coordinates: { lat: 0, lng: 0 } });
    const [destination, setDestination] = useState({ name: '', coordinates: { lat: 0, lng: 0 } });
    const [waypoints, setWaypoints] = useState([]);
    const [waypointName, setWaypointName] = useState('');
    const [message, setMessage] = useState('');

    const getCoords = async (placeName) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`);
            const data = await response.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            }
            throw new Error('Location not found');
        } catch (error) {
            setMessage(`Error finding coordinates for ${placeName}: ${error.message}`);
            return null;
        }
    };

    const addWaypoint = async () => {
        if (!waypointName) return;
        const coords = await getCoords(waypointName);
        if (coords) {
            setWaypoints([...waypoints, { name: waypointName, coordinates: coords }]);
            setWaypointName('');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Creating trip...');
        
        const startCoords = await getCoords(startPoint.name);
        const destCoords = await getCoords(destination.name);

        if (!startCoords || !destCoords) {
            setMessage('Could not find coordinates for start or destination.');
            return;
        }

        const tripData = {
            title,
            description,
            startPoint: { ...startPoint, coordinates: startCoords },
            destination: { ...destination, coordinates: destCoords },
            waypoints,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(tripData),
            });
            if (!response.ok) throw new Error('Failed to create trip');
            setMessage('Trip created successfully!');
            setTimeout(() => navigate('/home'), 2000);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };
    
    const mapWaypoints = [
        startPoint.coordinates.lat ? startPoint : null,
        ...waypoints,
        destination.coordinates.lat ? destination : null,
    ].filter(Boolean);


    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 p-4 bg-gray-50 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Create Your Road Trip</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Trip Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
                        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Start Point (e.g., Delhi, India)" value={startPoint.name} onChange={e => setStartPoint({ ...startPoint, name: e.target.value })} required className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Destination (e.g., Mumbai, India)" value={destination.name} onChange={e => setDestination({ ...destination, name: e.target.value })} required className="w-full p-2 border rounded" />
                        <div className="flex gap-2">
                            <input type="text" placeholder="Add a Waypoint (e.g., Jaipur)" value={waypointName} onChange={e => setWaypointName(e.target.value)} className="w-full p-2 border rounded" />
                            <button type="button" onClick={addWaypoint} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
                        </div>
                        <ul className="list-disc pl-5">
                            {waypoints.map((wp, i) => <li key={i}>{wp.name}</li>)}
                        </ul>
                        <button type="submit" className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800">Create Trip</button>
                        {message && <p className="text-center mt-2">{message}</p>}
                    </form>
                </div>
                <div className="w-full md:w-2/3 h-64 md:h-auto"><Map waypoints={mapWaypoints} /></div>
            </div>
        </div>
    );
};

export default CreateTrip;