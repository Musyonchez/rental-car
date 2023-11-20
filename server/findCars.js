const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

const corsOptions = {
  origin: 'http://localhost:3000', // replace with your React app's port
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

const uri = "mongodb+srv://musyonchez:ukutuM20@cluster1.sd4gqxw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
