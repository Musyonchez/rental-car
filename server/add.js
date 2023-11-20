import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://musyonchez:ukutuM20@cluster1.sd4gqxw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {

    // Get the database and collection on which to run the operation
    const database = client.db("carRental");
    const foods = database.collection("cars");

    // Create an array of documents to insert
    const docs = [
      {
        car_id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2022,
        rental_price_per_day: 50.00,
        availability_status: "Available",
        features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
        images: ["car1_image1.jpg", "car1_image2.jpg"],
        mileage: 30, // in miles per gallon
        number_of_seats: 5
      },
      {
        car_id: 2,
        make: "Honda",
        model: "Accord",
        year: 2021,
        rental_price_per_day: 45.00,
        availability_status: "Available",
        features: ["Power Windows", "Cruise Control", "USB Port"],
        images: ["car2_image1.jpg", "car2_image2.jpg"],
        mileage: 28,
        number_of_seats: 5
      },
      {
        car_id: 3,
        make: "Ford",
        model: "Mustang",
        year: 2023,
        rental_price_per_day: 75.00,
        availability_status: "Not Available",
        features: ["Convertible", "Leather Seats", "Premium Sound System"],
        images: ["car3_image1.jpg", "car3_image2.jpg"],
        mileage: 22,
        number_of_seats: 4
      },
      {
        car_id: 4,
        make: "Chevrolet",
        model: "Equinox",
        year: 2020,
        rental_price_per_day: 55.00,
        availability_status: "Available",
        features: ["SUV", "Rearview Camera", "Apple CarPlay"],
        images: ["car4_image1.jpg", "car4_image2.jpg"],
        mileage: 24,
        number_of_seats: 5
      },
      {
        car_id: 5,
        make: "Nissan",
        model: "Altima",
        year: 2022,
        rental_price_per_day: 48.00,
        availability_status: "Available",
        features: ["Keyless Entry", "Dual-zone Climate Control", "Navigation System"],
        images: ["car5_image1.jpg", "car5_image2.jpg"],
        mileage: 30,
        number_of_seats: 5
      },
      {
        car_id: 6,
        make: "BMW",
        model: "X5",
        year: 2021,
        rental_price_per_day: 90.00,
        availability_status: "Available",
        features: ["Luxury SUV", "Panoramic Sunroof", "Heated Seats"],
        images: ["car6_image1.jpg", "car6_image2.jpg"],
        mileage: 25,
        number_of_seats: 7
      },
      {
        car_id: 7,
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        rental_price_per_day: 120.00,
        availability_status: "Available",
        features: ["Electric", "Autopilot", "Large Touchscreen"],
        images: ["car7_image1.jpg", "car7_image2.jpg"],
        mileage: 300, // electric range in miles
        number_of_seats: 5
      },
      {
        car_id: 8,
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2022,
        rental_price_per_day: 80.00,
        availability_status: "Available",
        features: ["Luxury Sedan", "Leather Interior", "Collision Prevention"],
        images: ["car8_image1.jpg", "car8_image2.jpg"],
        mileage: 28,
        number_of_seats: 5
      },
      {
        car_id: 9,
        make: "Audi",
        model: "Q7",
        year: 2021,
        rental_price_per_day: 95.00,
        availability_status: "Not Available",
        features: ["Midsize SUV", "Quattro All-Wheel Drive", "Virtual Cockpit"],
        images: ["car9_image1.jpg", "car9_image2.jpg"],
        mileage: 22,
        number_of_seats: 7
      },
      {
        car_id: 10,
        make: "Hyundai",
        model: "Elantra",
        year: 2023,
        rental_price_per_day: 40.00,
        availability_status: "Available",
        features: ["Fuel-Efficient", "Android Auto", "Blind Spot Detection"],
        images: ["car10_image1.jpg", "car10_image2.jpg"],
        mileage: 32,
        number_of_seats: 5
      },
      {
        car_id: 11,
        make: "Ford",
        model: "Explorer",
        year: 2022,
        rental_price_per_day: 70.00,
        availability_status: "Available",
        features: ["SUV", "Third-Row Seating", "Sync Infotainment System"],
        images: ["car11_image1.jpg", "car11_image2.jpg"],
        mileage: 26,
        number_of_seats: 7
      },
      {
        car_id: 12,
        make: "Chevrolet",
        model: "Malibu",
        year: 2021,
        rental_price_per_day: 50.00,
        availability_status: "Available",
        features: ["Sedan", "Apple CarPlay", "Lane Departure Warning"],
        images: ["car12_image1.jpg", "car12_image2.jpg"],
        mileage: 29,
        number_of_seats: 5
      },
      {
        car_id: 13,
        make: "Toyota",
        model: "Rav4",
        year: 2023,
        rental_price_per_day: 60.00,
        availability_status: "Available",
        features: ["Compact SUV", "Adaptive Cruise Control", "Blind Spot Monitoring"],
        images: ["car13_image1.jpg", "car13_image2.jpg"],
        mileage: 28,
        number_of_seats: 5
      },
      {
        car_id: 14,
        make: "Honda",
        model: "Pilot",
        year: 2022,
        rental_price_per_day: 75.00,
        availability_status: "Available",
        features: ["Midsize SUV", "Honda Sensing Safety Suite", "Power Tailgate"],
        images: ["car14_image1.jpg", "car14_image2.jpg"],
        mileage: 24,
        number_of_seats: 8
      },
      {
        car_id: 15,
        make: "Volkswagen",
        model: "Golf",
        year: 2021,
        rental_price_per_day: 45.00,
        availability_status: "Available",
        features: ["Hatchback", "Turbocharged Engine", "Touchscreen Infotainment"],
        images: ["car15_image1.jpg", "car15_image2.jpg"],
        mileage: 32,
        number_of_seats: 5
      },
      {
        car_id: 16,
        make: "Subaru",
        model: "Outback",
        year: 2022,
        rental_price_per_day: 65.00,
        availability_status: "Available",
        features: ["Wagon", "All-Wheel Drive", "Eyesight Driver Assist"],
        images: ["car16_image1.jpg", "car16_image2.jpg"],
        mileage: 27,
        number_of_seats: 5
      },
      {
        car_id: 17,
        make: "Mazda",
        model: "CX-5",
        year: 2021,
        rental_price_per_day: 55.00,
        availability_status: "Available",
        features: ["Compact SUV", "Mazda Connect Infotainment", "Advanced Safety Features"],
        images: ["car17_image1.jpg", "car17_image2.jpg"],
        mileage: 30,
        number_of_seats: 5
      },
      {
        car_id: 18,
        make: "Jeep",
        model: "Cherokee",
        year: 2023,
        rental_price_per_day: 68.00,
        availability_status: "Available",
        features: ["Off-Road Capability", "Uconnect Infotainment", "Apple CarPlay"],
        images: ["car18_image1.jpg", "car18_image2.jpg"],
        mileage: 25,
        number_of_seats: 5
      },
      {
        car_id: 19,
        make: "Kia",
        model: "Sorento",
        year: 2022,
        rental_price_per_day: 62.00,
        availability_status: "Available",
        features: ["Crossover SUV", "Smart Cruise Control", "Android Auto"],
        images: ["car19_image1.jpg", "car19_image2.jpg"],
        mileage: 26,
        number_of_seats: 7
      },
      {
        car_id: 20,
        make: "Lexus",
        model: "RX",
        year: 2021,
        rental_price_per_day: 85.00,
        availability_status: "Available",
        features: ["Luxury SUV", "Lexus Enform Infotainment", "Heated and Ventilated Seats"],
        images: ["car20_image1.jpg", "car20_image2.jpg"],
        mileage: 23,
        number_of_seats: 5
      }
    ];

    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };

    // Execute insert operation
    const result = await foods.insertMany(docs, options);
   
    // Print result
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
