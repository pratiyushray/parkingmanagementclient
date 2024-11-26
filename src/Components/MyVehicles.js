import React, { useState, useEffect } from 'react';
import '../Styles/MyVehicles.css';
import GettingParkingSpot from './GettingParkingSpot';

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Toggle for modal visibility
  const [vehicleData, setVehicleData] = useState({
    vehicleName: '',
    vehicleNumber: '',
    vehicleType: '',
    userId: null,
  });

  // Fetch user ID
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.userId) {
          setVehicleData((prev) => ({ ...prev, userId: user.userId }));
        } else {
          console.error('User ID not found in local storage object');
        }
      } catch (err) {
        console.error('Failed to parse user object from local storage', err);
      }
    }
  }, []);

  // Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        const response = await fetch('http://localhost:5243/api/vehicle/owner', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch vehicles');
        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Add vehicle
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const response = await fetch('http://localhost:5243/api/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicleData),
      });
      if (!response.ok) throw new Error('Failed to add vehicle');
      const addedVehicle = await response.json();
      setVehicles((prevVehicles) => [...prevVehicles, addedVehicle]);
      alert('Vehicle added successfully');
      setShowModal(false);
      setVehicleData({ ...vehicleData, vehicleName: '', vehicleNumber: '', vehicleType: '' });
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <div>Loading vehicles...</div>;

  return (
    <div>
      <button className="add-vehicle-btn" onClick={() => setShowModal(true)}>
        Add Vehicle
      </button>
      <hr></hr>
      {error ? (
        <div>
          <p>{error}</p>
          <p>Start using the system to see your vehicles here.</p>
        </div>
      ) : vehicles.length === 0 ? (
        <p>No vehicles found. Add a vehicle to see it here.</p>
      ) : (
        <div className="vehicle-cards">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <h3>Vehicle Name: {vehicle.vehicleName}</h3>
              <p>Vehicle Number: {vehicle.vehicleNumber}</p>
              <p>Vehicle Type: {vehicle.vehicleType}</p>
            </div>
          ))}
        </div>
      )}

      

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add a Vehicle</h2>
            <form onSubmit={handleAddVehicle}>
              <div>
                <label>Vehicle Name:</label>
                <input
                  type="text"
                  value={vehicleData.vehicleName}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, vehicleName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Vehicle Number:</label>
                <input
                  type="text"
                  value={vehicleData.vehicleNumber}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, vehicleNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Vehicle Type:</label>
                <input
                  type="text"
                  value={vehicleData.vehicleType}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, vehicleType: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Add Vehicle</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <GettingParkingSpot/>
    </div>
  );
};

export default MyVehicles;
