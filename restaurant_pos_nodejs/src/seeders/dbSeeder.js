require("dotenv").config({ path: __dirname + "/../../.env" });
const mongoose = require("mongoose");
const { seedMenu } = require("./menuSeeder");
const { seedTables } = require("./tableSeeder");

const runSeeders = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant_pos";
    console.log("Connecting to MongoDB for database seeding...");
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.\n");

    console.log("Running MenuSeeder...");
    await seedMenu();
    console.log("MenuSeeder finished.\n");

    console.log("Running TableSeeder...");
    await seedTables();
    console.log("TableSeeder finished.\n");

    console.log("All seeders executed successfully!");
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error running database seeders:", error);
    process.exit(1);
  }
};

runSeeders();
