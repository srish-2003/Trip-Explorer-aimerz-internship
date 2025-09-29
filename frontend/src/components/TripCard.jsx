/**
 * @fileoverview *  TripCard component displays a summary of a trip including its title,
 * description, creator, and a mini map showing the trip route
 */
import React from 'react';
import Map from './Map';

const TripCard = ({ trip, onSave, showSaveButton = true }) => {
  const handleSave = () => onSave && onSave(trip._id);
  const waypoints = [trip.startPoint, ...trip.waypoints, trip.destination];
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isMyTrip = currentUser && currentUser._id === trip.createdBy._id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <div className="h-64 bg-gray-200 flex-shrink-0"><Map waypoints={waypoints} /></div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
        <p className="text-gray-600 text-sm mb-2">By: {trip.createdBy?.username || 'Unknown'}</p>
        <p className="text-gray-700 mb-4 flex-grow">{trip.description}</p>
        {showSaveButton && !isMyTrip && (
          <button onClick={handleSave} className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition mt-auto">Save</button>
        )}
      </div>
    </div>
  );
};
export default TripCard;