import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TripCard from '../components/TripCard';

const AccountPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch user profile');
                const data = await response.json();
                setUserData(data.user);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    if (loading) return <div className="text-center mt-8">Loading account...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">My Created Trips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userData?.roadTrips.length > 0 ? (
                            userData.roadTrips.map(trip => <TripCard key={trip._id} trip={trip} showSaveButton={false} />)
                        ) : <p>You haven't created any trips. <a href="/create-trip" className="text-green-700 hover:underline">Create one!</a></p>}
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">My Saved Trips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {userData?.savedTrips.length > 0 ? (
                            userData.savedTrips.map(trip => <TripCard key={trip._id} trip={trip} showSaveButton={false} />)
                        ) : <p>You haven't saved any trips. <a href="/home" className="text-green-700 hover:underline">Explore!</a></p>}
                    </div>
                </section>
            </main>
        </div>
    );
};
export default AccountPage;