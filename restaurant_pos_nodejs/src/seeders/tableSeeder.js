const Table = require("../models/tableModel");

const initialTables = [
  { tableNo: 1, seats: 4, status: "Available" },
  { tableNo: 2, seats: 6, status: "Available" },
  { tableNo: 3, seats: 2, status: "Available" },
  { tableNo: 4, seats: 4, status: "Available" },
  { tableNo: 5, seats: 3, status: "Available" },
  { tableNo: 6, seats: 4, status: "Available" },
  { tableNo: 7, seats: 5, status: "Available" },
  { tableNo: 8, seats: 5, status: "Available" },
  { tableNo: 9, seats: 6, status: "Available" },
  { tableNo: 10, seats: 6, status: "Available" },
  { tableNo: 11, seats: 4, status: "Available" },
  { tableNo: 12, seats: 6, status: "Available" },
  { tableNo: 13, seats: 2, status: "Available" },
  { tableNo: 14, seats: 6, status: "Available" },
  { tableNo: 15, seats: 3, status: "Available" }
];

const seedTables = async () => {
  await Table.deleteMany({});
  console.log("  └─ Cleared existing tables.");
  await Table.insertMany(initialTables);
  console.log(`  └─ Successfully seeded ${initialTables.length} tables.`);
};

module.exports = { seedTables };
