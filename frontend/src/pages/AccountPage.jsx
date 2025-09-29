/**
 * @fileoverview Account page component.
 * Displays user profile information retrieved from the backend.
 * Handles authentication check and error messages if the user is not logged in.
 */
import React, { useEffect, useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login again.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to fetch user");
      }

      const data = await res.json();
      setUser(data.user); // store only the user object
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) return <p className="text-red-600">⚠️ {error}</p>;
  if (!user) return <p>Loading account...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Account Page</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3 className="mt-4 font-semibold">Saved Trips</h3>
      {user.savedTrips && user.savedTrips.length > 0 ? (
        <ul className="list-disc ml-5">
          {user.savedTrips.map((trip, index) => (
            <li key={index}>
              {trip.name || "Unnamed Trip"}{" "}
              {trip.coordinates && `(${trip.coordinates.lat}, ${trip.coordinates.lng})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips saved yet.</p>
      )}

      <h3 className="mt-4 font-semibold">Created Trips</h3>
      {user.userTrips && user.userTrips.length > 0 ? (
        <ul className="list-disc ml-5">
          {user.userTrips.map((trip, index) => (
            <li key={index}>
              {trip.name || "Unnamed Trip"}{" "}
              {trip.coordinates && `(${trip.coordinates.lat}, ${trip.coordinates.lng})`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips created yet.</p>
      )}
    </div>
  );
};

export default AccountPage;

