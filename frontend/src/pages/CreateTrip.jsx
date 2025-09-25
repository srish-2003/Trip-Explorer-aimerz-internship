import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const navigate = useNavigate();

  // State for the entire trip object
  const [trip, setTrip] = useState({
    title: "",
    description: "",
    startPoint: { name: "", coordinates: { lat: "", lng: "" } },
    destination: { name: "", coordinates: { lat: "", lng: "" } },
    waypoints: [],
  });

  // A separate, temporary state for the waypoint being added
  const [waypoint, setWaypoint] = useState({
    name: "",
    coordinates: { lat: "", lng: "" },
  });

  // Adds the temporary waypoint to the main trip's list
  const addWaypoint = () => {
    if (waypoint.name && waypoint.coordinates.lat && waypoint.coordinates.lng) {
      setTrip({ ...trip, waypoints: [...trip.waypoints, waypoint] });
      // Reset the waypoint input fields
      setWaypoint({ name: "", coordinates: { lat: "", lng: "" } });
    }
  };

  // Submits the final trip data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Trip created successfully!");
        navigate("/home");
      } else {
        alert(data.message || "Failed to create trip");
      }
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Road Trip</h2>

      {/* --- Trip Title & Description --- */}
      <input
        type="text"
        placeholder="Trip Title"
        value={trip.title}
        onChange={(e) => setTrip({ ...trip, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={trip.description}
        onChange={(e) => setTrip({ ...trip, description: e.target.value })}
      />

      {/* --- Start Point --- */}
      <h3>Start Point</h3>
      <input
        type="text"
        placeholder="Name"
        value={trip.startPoint.name}
        onChange={(e) =>
          setTrip({
            ...trip,
            startPoint: { ...trip.startPoint, name: e.target.value },
          })
        }
        required
      />
      <input
        type="number"
        placeholder="Latitude"
        value={trip.startPoint.coordinates.lat}
        onChange={(e) =>
          setTrip({
            ...trip,
            startPoint: {
              ...trip.startPoint,
              coordinates: { ...trip.startPoint.coordinates, lat: e.target.value },
            },
          })
        }
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        value={trip.startPoint.coordinates.lng}
        onChange={(e) =>
          setTrip({
            ...trip,
            startPoint: {
              ...trip.startPoint,
              coordinates: { ...trip.startPoint.coordinates, lng: e.target.value },
            },
          })
        }
        required
      />

      {/* --- Destination --- */}
      <h3>Destination</h3>
      <input
        type="text"
        placeholder="Name"
        value={trip.destination.name}
        onChange={(e) =>
          setTrip({
            ...trip,
            destination: { ...trip.destination, name: e.target.value },
          })
        }
        required
      />
      <input
        type="number"
        placeholder="Latitude"
        value={trip.destination.coordinates.lat}
        onChange={(e) =>
          setTrip({
            ...trip,
            destination: {
              ...trip.destination,
              coordinates: { ...trip.destination.coordinates, lat: e.target.value },
            },
          })
        }
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        value={trip.destination.coordinates.lng}
        onChange={(e) =>
          setTrip({
            ...trip,
            destination: {
              ...trip.destination,
              coordinates: { ...trip.destination.coordinates, lng: e.target.value },
            },
          })
        }
        required
      />

      {/* --- Waypoints --- */}
      <h3>Waypoints</h3>
      <input
        type="text"
        placeholder="Waypoint Name"
        value={waypoint.name}
        onChange={(e) => setWaypoint({ ...waypoint, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Latitude"
        value={waypoint.coordinates.lat}
        onChange={(e) =>
          setWaypoint({
            ...waypoint,
            coordinates: { ...waypoint.coordinates, lat: e.target.value },
          })
        }
      />
      <input
        type="number"
        placeholder="Longitude"
        value={waypoint.coordinates.lng}
        onChange={(e) =>
          setWaypoint({
            ...waypoint,
            coordinates: { ...waypoint.coordinates, lng: e.target.value },
          })
        }
      />
      <button type="button" onClick={addWaypoint}>
        Add Waypoint
      </button>

      {/* --- Display Added Waypoints --- */}
      <ul>
        {trip.waypoints.map((wp, idx) => (
          <li key={idx}>
            {wp.name} ({wp.coordinates.lat}, {wp.coordinates.lng})
          </li>
        ))}
      </ul>

      <button type="submit">Create Trip</button>
    </form>
  );
};

export default CreateTrip;