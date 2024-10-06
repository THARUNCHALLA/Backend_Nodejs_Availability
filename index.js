const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const Vendorrouter = require("./routes/vendorRoute");
const firmRouter = require("./routes/firmRoute")
const productRouter = require("./routes/productRoute")
const app = express();
app.use(express.json())
dotEnv.config();
const cors = require('cors'); // Import the cors module

// Enable CORS for http://localhost:3000 (your front-end)
app.use(cors({
  origin: 'http://localhost:3000'
}));


console.log("MongoDB URI:", process.env.MONGO_URI); // Debug log

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

const PORT = process.env.PORT || 3004;

app.get("/", (req, res) => {
  res.send("Welcome To Suby");
});

app.use("/vendor",Vendorrouter)

app.use("/product",productRouter)

app.use("/uploads",express.static("uploads")) // standard format for images in nodejs(express.static)

app.use("/firm",firmRouter)

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
