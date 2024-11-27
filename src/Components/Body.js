import React, { useEffect, useState } from "react";
import "../Styles/Body.css";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");

  useEffect(() => {
    // Fetch parking spots
    const fetchParkingSpots = async () => {
      try {
        const response = await fetch("http://localhost:5243/api/parkingSpot/");
        const data = await response.json();
        setParkingSpots(data);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
      }
    };

    fetchParkingSpots();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5243/api/vehicle/owner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (!response.ok) {
        console.error("Error fetching vehicles:", await response.text());
        return;
      }
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleSpotClick = (spotId) => {
    setSelectedSpotId(spotId);
    setIsModalOpen(true); // Open the modal
    fetchVehicles(); // Fetch vehicles when opening the modal
  };

  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;
    const selectedVehicle = vehicles.find((vehicle) => vehicle.vehicleId.toString() === vehicleId);
    if (selectedVehicle) {
      setSelectedVehicleId(selectedVehicle.vehicleId);
      setSelectedVehicleType(selectedVehicle.vehicleType);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5243/api/parkingSpot/${selectedSpotId}/entry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            vehicleId: selectedVehicleId,
            vehicleType: selectedVehicleType, // Send the selected vehicleType
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to occupy the spot."}`);
        return;
      }

      alert("Parking spot occupied successfully!");
      setIsModalOpen(false); // Close the modal after success
      setSelectedVehicleId(""); // Reset selection
      setSelectedVehicleType(""); // Reset selection

      // Optionally refetch parking spots to update availability
      const updatedSpots = await fetch("http://localhost:5243/api/parkingSpot/");
      const updatedData = await updatedSpots.json();
      setParkingSpots(updatedData);
    } catch (error) {
      console.error("Error handling parking spot click:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <main>
        <section className="parking-section">
          <h2>Parking Spaces</h2>
          <div className="parking-container">
            <div className="parking-space">
              <h3>All Wheeler</h3>
              <div className="space-boxes">
                {parkingSpots.map((spot) => (
                  <div
                    key={spot.spotId}
                    className={`space ${spot.isOccupied ? "occupied" : "available"}`}
                    style={{ backgroundColor: spot.isOccupied ? "red" : "green" }}
                    onClick={() => !spot.isOccupied && handleSpotClick(spot.spotId)}
                  >
                    <div className="text">{`A${spot.spotId}`}</div>
                  </div>
                ))}
              </div>
              <p>
                Total Available:{" "}
                <span className="available-count">
                  {parkingSpots.filter((spot) => !spot.isOccupied).length}
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Vehicle</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Vehicle:</label>
                <select
                  value={selectedVehicleId}
                  onChange={handleVehicleChange} // Capture both vehicleId and vehicleType
                  required
                >
                  <option value="" disabled>
                    -- Select Your Vehicle --
                  </option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.vehicleId} value={vehicle.vehicleId}>
                      {`${vehicle.vehicleType} - Number ${vehicle.vehicleNumber}`}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={!selectedVehicleId}>
                Submit
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
