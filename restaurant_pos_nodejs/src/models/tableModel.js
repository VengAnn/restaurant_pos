const mongoose = require("mongoose");

// Schema representing a physical dining table inside the restaurant
const tableSchema = new mongoose.Schema({
    tableNo: { type: Number, required: true, unique: true }, // Unique identifier/number for the table
    status: {
        type: String,
        default: "Available" // Availability status (e.g. Available, Booked, Occupied)
    },
    seats: { 
        type: Number,
        required: true // Number of dining seats at this table
    },
    currentOrder: {type: mongoose.Schema.Types.ObjectId, ref: "Order"} // Reference to the active order placed at this table
});

module.exports = mongoose.model("Table", tableSchema);