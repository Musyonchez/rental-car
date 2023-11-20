"use client"
import Navbar from '../navbar/navbar';
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
  const sendToDatabase = async () => {
    try {
      // Assuming you have an API endpoint for storing orders
      const response = await fetch('http://localhost:8080/api/store-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          selectedCarData,
        }),
      });
  
      if (response.ok) {
        console.log('Order sent to the database successfully!');
      } else {
        const errorData = await response.json(); // Assuming the server returns JSON error details
        console.error('Error sending order to the database:', errorData);
      }
    } catch (error) {
      console.error('Error client sending order to the database:', error);
    } finally {
      window.location.href = `/profile`;
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-semibold mb-8">Confirmation Page</h1>
        <div>
          <div className="text-lg">
            <strong>Order details:</strong>
            {Object.keys(formData).length > 0 ? (
              <div className="mt-4">
                <div><strong>Pickup Information:</strong></div>
                <p>Location: {formData.pickupLocation}</p>
                <p>Date: {formData.pickupDate}</p>
                <p>Time: {formData.pickupTime}</p>

                <div className="mt-4"><strong>Drop-off Information:</strong></div>
                <p>Location: {formData.dropOffLocation}</p>
                <p>Date: {formData.returnDate}</p>
                <p>Time: {formData.returnTime}</p>

                <div className="mt-4"><strong>Additional Information:</strong></div>
                <p>Age: {formData.age}</p>
                <p>Live In: {formData.liveIn}</p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>

          <div className="text-lg mt-8">
            <strong>Selected car details:</strong>
            {Object.keys(selectedCarData).length > 0 ? (
              <div className="mt-4">
                <p>Make: {selectedCarData.make}</p>
                <p>Model: {selectedCarData.model}</p>
                <p>Year: {selectedCarData.year}</p>
                <p>Rental Price per Day: ${selectedCarData.rental_price_per_day}</p>
                <p>Availability: {selectedCarData.availability_status}</p>
                <p>Mileage: {selectedCarData.mileage} Km</p>
                <p>No of seats: {selectedCarData.number_of_seats} Seats</p>
                <div className="mt-4">
                  <p><strong>Features:</strong></p>
                  <ul className="list-disc pl-4">
                    {selectedCarData.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <button
          className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => sendToDatabase()}
        >
          Send to Save
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
