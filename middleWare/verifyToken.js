const Vendor = require("../models/Vendor");

const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.whatIsUrName;

const verifyToken = async (req, res, next) => {
    // Check for token in the Authorization header
    const token = req.headers.token;
    //console.log(req,"Request")
    if (!token) {
        return res.status(401).json({ message: "Token is Required" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        console.log(req.venderId)
        // Find the vendor using the vendor ID from the decoded token
        const vendor = await Vendor.findById(decoded.venderId); // assuming decoded.id contains the vendor ID
        console.log(vendor)
        if (!vendor) {
            return res.status(401).json({ message: "Vendor is not present" });
        }
        // Store vendor ID in request object for later use
        req.venderId = vendor._id;
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken; // Export the middleware
