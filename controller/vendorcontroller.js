const Vendor = require("../models/Vendor");
const Firm = require("../models/Firm")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotEnv = require("dotenv")

dotEnv.config()

const secretKey = process.env.whatIsUrName

const vendorRegistrations = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingVendor = await Vendor.findOne({ email });

        if (existingVendor) {
            return res.status(400).send({ message: "Email Already Present" });
        }

        // Check if the firm exists
        const firm = await Firm.find();
        console.log(firm, "FIRM")

        if (!firm) {
            return res.status(400).send({ message: "Firm not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            password: hashedPassword, // Correcting passWord to password
            email,
        });

        await newVendor.save(); // Store data in database using Mongoose
        res.status(201).send({ message: "Vendor Registration Successfully" });
        console.log("Vendor Registration Successful");

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const VendorPerson = await Vendor.findOne({ email });

        if (!VendorPerson || !(await bcrypt.compare(password, VendorPerson.password))) {
            return res.status(401).send({ message: "Invalid Username or Password" });
        }

        const token = jwt.sign({ venderId: VendorPerson._id }, secretKey, { expiresIn: "1h" })
        res.status(200).send({ message: "Login Successful", token });
        console.log("Login Success");

    } catch (error) {
        res.status(500).send({ message: "An error occurred during login" });
        console.error("Login Error:", error);
    }
};
//Vendor means Person
//firm means Restaurant

const getvenderList = async (req, res) => {
    try {
        const VendorList = await Vendor.find().populate('firm') // populating the firm field
        res.json({ VendorList })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
}

const singlevender = async(req,res)=>{
    const venderID = req.params.id

    try{
        const singleVendor = await Vendor.findById(venderID)
        if(!singleVendor){
            return res.status(401).send("vendor is not present")
        }
        res.status(201).json({singleVendor})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = { vendorRegistrations, vendorLogin, getvenderList,singlevender};
