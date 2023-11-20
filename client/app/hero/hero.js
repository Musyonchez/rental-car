import React, { useState } from 'react';

const Hero = () => {
    const [formData, setFormData] = useState({
      pickupLocation: '',
      pickupDate: '',
      pickupTime: '',
      dropOffLocation: '',
      returnDate: '',
      returnTime: '',
      age: '25+',
      liveIn: 'U.S.A.',
    });
  
    const [countries, setCountries] = useState([
      'U.S.A.',
      'Canada',
      'United Kingdom',
      'Germany',
      'Kenya',
      // Add more countries as needed
    ]);
  
    const currentDateTime = new Date().toISOString().slice(0, 16);
  
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
      

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Console log the form data
      // console.log('Form data:', formData);
  
      // Example server endpoint (replace with your actual server URL)
      const serverEndpoint = 'http://localhost:8080/api/data';
  
      try {
        const response = await fetch(serverEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          // Handle success, maybe show a success message
          // console.log('Form data submitted successfully!');
          window.location.href = '/pick_car';
        } else {
          // Handle errors, maybe show an error message
          // console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle network errors
        // console.error('Error:', error);
      }
    };
  
    return (
      <section className="flex justify-center items-center">
        <div className="bg-orange-400 flex justify-center items-center w-3/4 p-10 rounded-2xl mt-1 mb-2">
          <form onSubmit={handleSubmit}>
            {/* Your form fields */}
            <div className="flex flex-wrap my-3 justify-center items-center text-center">
              <div className='flex flex-col space-y-1 ml-5'>
                <label htmlFor="pickupLocation">Location</label>
                <input
                  className='border-2 border-black'
                  type="text"
                  id="pickupLocation"
                  placeholder="Where to pick up the car"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-wrap my-3 justify-center items-center text-center">
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="pickupDate">Pickup Date</label>
                    <input
                    className='border-2 border-black'
                    type="date"
                    id="pickupDate"
                    min={currentDateTime.slice(0, 10)}
                    value={formData.pickupDate}
                    onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="pickupTime">Pickup Time</label>
                    <input
                    className='border-2 border-black'
                    type="time"
                    id="pickupTime"
                    min={currentDateTime.slice(11)}
                    value={formData.pickupTime}
                    onChange={handleChange}
                    />
                </div>
                </div>

                <div className="flex flex-wrap my-3 justify-center items-center text-center">
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="dropOffLocation">Location</label>
                    <input
                    className='border-2 border-black'
                    type="text"
                    id="dropOffLocation"
                    placeholder="where to drop off the car"
                    value={formData.dropOffLocation}
                    onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="returnDate">Return Date</label>
                    <input
                    className='border-2 border-black'
                    type="date"
                    id="returnDate"
                    min={currentDateTime.slice(0, 10)}
                    value={formData.returnDate}
                    onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="returnTime">Return Time</label>
                    <input
                    className='border-2 border-black'
                    type="time"
                    id="returnTime"
                    min={currentDateTime.slice(11)}
                    value={formData.returnTime}
                    onChange={handleChange}
                    />
                </div>
                </div>

                <div className="flex flex-wrap my-3 justify-center items-center text-center">
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="age">Age</label>
                    <select
                    className='border-2 border-black'
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                    >
                    <option value="25+">25+</option>
                    <option value="24">24</option>
                    <option value="23">23</option>
                    <option value="22">22</option>
                    <option value="21">21</option>
                    <option value="20">20</option>
                    <option value="19">19</option>
                    <option value="18">18</option>
                    {/* Add more options as needed */}
                    </select>
                </div>
                <div className='flex flex-col space-y-1 ml-5'>
                    <label htmlFor="liveIn">I live in</label>
                    <select
                    className='border-2 border-black'
                    id="liveIn"
                    value={formData.liveIn}
                    onChange={handleChange}
                    >
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                        {country}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
            </div>
  
            <button className='flex mx-auto border-4 rounded-lg text-xl p-2 border-black' type="submit">Get my Car</button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Hero;
  