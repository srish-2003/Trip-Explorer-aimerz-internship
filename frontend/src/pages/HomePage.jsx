/**
 * @fileoverview Home page of roadtrip explorer.
 */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TripCard from '../components/TripCard';
/**
 * HomePage component displays all available road trips.
 * Users can explore trips, view details, and save trips to their account.
 * Fetches trips from backend API and handles saving trips for the logged-in user.
 *
 * Features:
 * - Fetches all trips from backend API on component mount
 * - Displays trips in a responsive grid using TripCard components
 * - Handles saving trips to the user account with feedback messages
 * - Shows loading and error states
 *
 */
const HomePage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTrips = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('http://localhost:5000/api/trips/get-all-trips', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch trips');
                const data = await res.json();
                setTrips(data.trips);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const handleSaveTrip = async (tripId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/users/save-trip/${tripId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setMessage(data.message);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage(err.message);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading trips...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Explore Road Trips</h1>
                {message && <div className="text-center mb-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trips.length > 0 ? (
                        trips.map(trip => <TripCard key={trip._id} trip={trip} onSave={handleSaveTrip} />)
                    ) : <p>No trips have been created yet.</p>}
                </div>
            </main>
        </div>
    );
};
export default HomePage;
