const mongoose = require("mongoose");

// Firm Schema
const firmSchema = new mongoose.Schema({
    firName: { type: String, required: true },
    category: [
      {
        veg: { type: Boolean, required: true },
        nonveg: { type: Boolean, required: true },
      },
    ],
    region: [
      {
        northIndian: { type: Boolean, required: true },
        southIndian: { type: Boolean, required: true },
        chinese: { type: Boolean, required: true },
        japanese: { type: Boolean, required: true },
      },
    ],
   
  });
  

// Create the Firm model
const Firm = mongoose.model("Firm", firmSchema);

module.exports = Firm