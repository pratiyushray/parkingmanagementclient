import React, { useState, useEffect } from 'react';
import '../Styles/GettingParkingSpot.css';

const GettingParkingSpot = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchParkingHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://localhost:5243/api/parkingSpot/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch parking spot history');
        }

        const data = await response.json();
        setParkingHistory(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchParkingHistory();
}, []);

  const handleExit = async (spotId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(`http://localhost:5243/api/parkingSpot/${spotId}/exit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to process exit request');
      }

      const result = await response.json();
      setMessage(result.message || 'Exit processed successfully');
      
      // Optionally re-fetch the parking history to update the UI
      const updatedResponse = await fetch('http://localhost:5243/api/parkingSpot/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedHistory = await updatedResponse.json();
      setParkingHistory(updatedHistory);

    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Parking Spot History</h1>
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      {parkingHistory.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Spot ID</th>
              <th>Occupied</th>
              <th>Start Time</th>
              <th>Vehicle Type</th>
              <th>Amount Charged</th>
              <th>Vehicle Owner</th>
              <th>Vehicle ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parkingHistory.map((history) => (
              <tr key={history.spotId}>
                <td>{history.spotId}</td>
                <td>{history.isOccupied ? 'Yes' : 'No'}</td>
                <td>{new Date(history.startTime).toLocaleString()}</td>
                <td>{history.vehicleType}</td>
                <td>{history.amountCharged.toFixed(2)}</td>
                <td>{history.vehicleOwner}</td>
                <td>{history.vehicleId}</td>
                <td>
                  {history.isOccupied && (
                    <button onClick={() => handleExit(history.spotId)}>
                      Exit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No parking history available.</p>
      )}
    </div>
  );
};

export default GettingParkingSpot;
