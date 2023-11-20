const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your client's URL
  credentials: true,
}));
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
  const formData = req.body;

  // Process the form data as needed (you can save it to a database, perform validation, etc.)
  console.log('Received form data on the server:', formData);

  // Send a response to the client (you can customize this based on your needs)
  res.status(200).json({ message: 'Form data received successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
