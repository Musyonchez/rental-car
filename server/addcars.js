import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://musyonchez:ukutuM20@cluster1.sd4gqxw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {

    // Get the database and collection on which to run the operation
    const database = client.db("carRental");
    const cars = database.collection("cars");

    // Create a filter to target the documents you want to update
    // In this example, I'm using the car model as the filter
    const filter = { model: "RX" };

    // Create an update document specifying the changes to make
    const updateDoc = {
      $set: {
        // Update the images array with new URLs
        images: [
          "https://imgs.search.brave.com/jte5KTANgH31YcPPslxMxaqwtjOXqqTly0AhuFFdUJs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2ZmLzIwMThfTGV4/dXNfUlhfMzUwTF8z/LjVMX2Zyb250XzMu/MjQuMTkuanBn",
          "https://imgs.search.brave.com/tpbukF2gtzu6OD47ejnYtloVbJDPfjkkCMZYqdqjIlk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I4L0xleHVzX1JY/XzM1MF9MX0ZMXzFY/N0EwMzQ1LmpwZw",
          // Add more new image URLs as needed
        ],
      },
    };

    // Update the documents that match the specified filter
    const result = await cars.updateMany(filter, updateDoc);

    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}

run().catch(console.dir);
