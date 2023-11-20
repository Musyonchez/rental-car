const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Define your POST route for general form data
app.post('/api/data', (req, res) => {
  const formData = req.body;
  console.log('Received form data on the server:', formData);
  res.status(200).json({ message: 'Form data received successfully!' });
});

// Handle GET requests for '/api/data'
// Handle GET requests for '/api/data'
app.get('/api/data', (req, res) => {
  // Assuming you want to send an empty response with a 200 status
  res.status(200).json({});
});


const uri = "mongodb+srv://musyonchez:ukutuM20@cluster1.sd4gqxw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json()); // middleware for parsing JSON in requests

// Define your GET route for fetching car data
app.get('/api/cars', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("carRental");
    const cars = database.collection("cars");

    const allCars = await cars.find({}).toArray();
    res.json(allCars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Avoid closing the client connection here to reuse it for subsequent requests
  }
});

// Define your POST route for selecting a car
app.post('/api/select', (req, res) => {
  const selectCar = req.body;
  console.log('Received selected car data on the server:', selectCar);
  res.status(200).json({ message: 'Car selected successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
