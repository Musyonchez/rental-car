const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Define your POST route
app.post('/api/data', (req, res) => {
  const formData = req.body;
  console.log('Received form data on the server:', formData);
  res.status(200).json({ message: 'Form data received successfully!' });
});

// Handle GET requests for '/api/data'
app.get('/api/data', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
