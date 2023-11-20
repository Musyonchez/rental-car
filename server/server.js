const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');


const app = express();
const port = 8080;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const uri = "mongodb+srv://musyonchez:ukutuM20@cluster1.sd4gqxw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.json()); // middleware for parsing JSON in requests

let storedFormData = {}; // Variable to store form data

// Define your POST route for general form data
app.post('/api/data', (req, res) => {
  const formData = req.body;
  console.log('Received form data on the server:', formData);
  storedFormData = formData; // Store the received form data
  res.status(200).json({ message: 'Form data received successfully!' });
});

// Handle GET requests for '/api/data'
app.get('/api/data', (req, res) => {
  res.status(200).json(storedFormData);
});


// Define your GET route for fetching car data
app.get('/api/cars', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("carRental");
    const cars = database.collection("cars");

    const allCars = await cars.find({}).toArray();
    res.json(allCars);
  } catch (error) {
    console.error('Error server fetching cars:', error);
    res.status(500).json({ error: 'Internal server Server Error' });
  } finally {
    // Avoid closing the client connection here to reuse it for subsequent requests
  }
});

// Handle GET requests for '/api/select/:id'
app.get('/api/select/:id', async (req, res) => {
  const carId = req.params.id;

  try {
    await client.connect();
    const database = client.db("carRental");
    const cars = database.collection("cars");

    const selectedCar = await cars.findOne({ _id: new ObjectId(carId) });

    if (selectedCar) {
      res.json(selectedCar);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the client connection after use
    await client.close();
  }
});

// Define your POST route for selecting a car
app.post('/api/select', (req, res) => {
  const selectCar = req.body;
  console.log('Received selected car data on the server:', selectCar);
  res.status(200).json({ message: 'Car selected successfully!' });
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  // Configure the nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'musyonchez@gmail.com', // Replace with your Gmail email
      pass: 'ukutuM02', // Replace with your Gmail password
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'musyonchez@gmail.com', // Replace with your Gmail email
    to,
    subject,
    text: body,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define your POST route for storing orders
app.post('/api/store-order', async (req, res) => {
  const orderData = req.body;

  try {
    await client.connect();
    const database = client.db("carRental");
    const orders = database.collection("orders");

    // Insert the order data into the 'orders' collection
    const result = await orders.insertOne(orderData);

    if (result.insertedCount > 0) {
      res.status(200).json({ message: 'Order stored successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to store order' });
    }
  } catch (error) {
    console.error('Error storing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the client connection after use
    await client.close();
  }
});

app.get('/api/store-order', (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});


app.post('/api/store-contact', async (req, res) => {
  const contactInfo = req.body;

  try {
    await client.connect();
    const database = client.db("carRental");
    const contacts = database.collection("contacts");

    // Insert the contact information into the 'contacts' collection
    const result = await contacts.insertOne(contactInfo);

    if (result.insertedCount > 0) {
      res.status(200).json({ message: 'Contact information stored successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to store contact information' });
    }
  } catch (error) {
    console.error('Error storing contact information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
