const mongoose = require("mongoose");

// Firm Schema
const firmSchema = new mongoose.Schema({
    firName: {
        type: String,
        required: true, // Corrected "require" to "required"
        unique: true // Unique name
    },
    area: {
        type: String,
        required: true // Corrected "require" to "required"
    },
    category: {
        type: [
            {
                type: String,
                enum: ["Veg", "NonVeg"]
            }
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ["North-indian", "South-indian", "Chinese", "Bakery"]
            }
        ]
    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor" // Referencing the "Vendor" model correctly
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
});

// Create the Firm model
const Firm = mongoose.model("Firm", firmSchema);

module.exports = Firm