import Navbar from '@/components/navbar/navbar';
import React, { useEffect, useState } from 'react';

const ConfirmationPage = () => {
  const [formData, setFormData] = useState({});
  const [selectedCarData, setSelectedCarData] = useState({});
  
  useEffect(() => {
    // Check if the code is running on the client side
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const carId = searchParams.get('carId');

      const fetchData = async () => {
        try {
          const [formDataResponse, selectedCarDataResponse] = await Promise.all([
            fetch('http://localhost:8080/api/data').then((response) => response.json()),
            fetch(`http://localhost:8080/api/select/${carId}`).then((response) => response.json()),
          ]);

          console.log('formDataResponse:', formDataResponse);
          console.log('selectedCarDataResponse:', selectedCarDataResponse);

          setFormData(formDataResponse);
          setSelectedCarData(selectedCarDataResponse);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Confirmation Page</h1>
      <div>
      <p>
  Order details:
  {Object.keys(formData).length > 0 ? (
    <div>
      <p>Pickup Information:</p>
      <p>Location: {formData.pickupLocation}</p>
      <p>Date: {formData.pickupDate}</p>
      <p>Time: {formData.pickupTime}</p>

      <p>Drop-off Information:</p>
      <p>Location: {formData.dropOffLocation}</p>
      <p>Date: {formData.returnDate}</p>
      <p>Time: {formData.returnTime}</p>

      <p>Additional Information:</p>
      <p>Age: {formData.age}</p>
      <p>Live In: {formData.liveIn}</p>
    </div>
  ) : (
    'No data available'
  )}
</p>

        <p>
  Selected car details:
  {Object.keys(selectedCarData).length > 0 ? (
    <div>
      <p>Make: {selectedCarData.make}</p>
      <p>Model: {selectedCarData.model}</p>
      <p>Year: {selectedCarData.year}</p>
      <p>Rental Price per Day: ${selectedCarData.rental_price_per_day}</p>
      <p>Availability: {selectedCarData.availability_status}</p>
      <p>Mileage: {selectedCarData.mileage} Km</p>
      <p>No of seats: {selectedCarData.number_of_seats} Seats</p>
      <div>
        <p>Features:</p>
        <ul>
          {selectedCarData.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    'No data available'
  )}
</p>

      </div>
    </div>
  );
};

export default ConfirmationPage;
