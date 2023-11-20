"use client"
import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import axios from 'axios'; // Import axios for making HTTP requests

const ConfirmationPage = ({}) => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const sendToDatabase = async () => {
    try {
      // Assuming you have an API endpoint for storing contact info
      const response = await axios.post('http://localhost:8080/api/store-contact', contactInfo);

      if (response.status === 200) {
        console.log('Contact information sent to the database successfully!');
      } else {
        console.error('Error: Contact information not stored.');
      }
    } catch (error) {
      console.error('Error sending contact information to the database:', error);
    }
  };

  const handleSubmit = async () => {
    // Send contact information to the database
    await sendToDatabase();

    // Display a thank-you message
    setSubmitMessage('Thank you! We will contact you about your car.');

    // You can clear the form fields if needed
    setContactInfo({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto my-8 p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-semibold mb-8">Confirmation Page</h1>
        <div>
          {/* ... (previous content) ... */}
        </div>

        {/* Contact Information Form */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactInfo.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {submitMessage && <p className="mt-4 text-green-600">{submitMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
