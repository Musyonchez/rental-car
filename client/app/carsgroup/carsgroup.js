import React, { useEffect, useState } from 'react';

const Carsgroup = () => {
  const url = 'http://localhost:8080/api/cars';
  const selectUrl = 'http://localhost:8080/api/select'; // Corrected variable name
  const [carData, setCarData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // State to store the selected car

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setCarData(data);
        } else {
          console.error('Failed to fetch car data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCarData();
  }, []);

  const handleCarSelection = async (carId) => {
    setSelectedCar(carId);

    try {
      const response = await fetch(selectUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carId }),
      });

      if (response.ok) {
        // Handle success, maybe show a success message
        // console.log('Form data submitted successfully!');
      window.location.href = `/get_car?carId=${carId}`;
      } else {
        // Handle errors, maybe show an error message
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-screen flex flex-col items-center justify-center'>
      <h2 className='flex text-center mt-5 mb-7'>Explore our car listings</h2>
      {carData.map((car) => (
        <div key={car._id}>
          <div className='bg-orange-500 h-2 w-full my-10'></div>
          <div className='flex flex-row w-screen'>
            <div className='flex flex-1 justify-center items-center'>
              <div className=''>
                <ul className=''>
                  {car.images.map((image, index) => (
                    <li className='mb-1' key={index}>
                      <img src={image} alt='' />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='flex flex-col flex-1 w-1/2 mb-5 ml-5 justify-center'>
              {/* Car details */}
              <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <p>Rental Price per Day: ${car.rental_price_per_day}</p>
              <p>Availability: {car.availability_status}</p>
              <p>Mileage: {car.mileage}00Km</p>
              <p>No of seats: {car.number_of_seats} Seats</p>
              <div className=''>
                <p>Features:</p>
                <ul className='list-disc list-inside'>
                  {car.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              {/* Button to select the car and trigger the redirection */}
              <button
                className='bg-orange-500 text-left my-3 w-fit px-1'
                onClick={() => handleCarSelection(car._id)}
              >
                Select Car
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carsgroup;
