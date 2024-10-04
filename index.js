const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const Vendorrouter = require("./routes/vendorRoute");
const firmRouter = require("./routes/firmRoute")
const productRouter = require("./routes/productRoute")
const app = express();
app.use(express.json())
dotEnv.config();

console.log("MongoDB URI:", process.env.MONGO_URI); // Debug log

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

const port = 3004;

app.get("/home", (req, res) => {
  res.send("Hello");
});

app.use("/vendor",Vendorrouter)

app.use("/product",productRouter)

app.use("/uploads",express.static("uploads")) // standard format for images in nodejs(express.static)

app.use("/firm",firmRouter)

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
