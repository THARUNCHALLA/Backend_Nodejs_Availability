const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    const { firName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined; // Get image filename if uploaded
    try {
        // Find the vendor based on the vendorId from the token (assumed you get this from middleware or JWT)
        const VendorPerson = await Vendor.findById(req.venderId); 
        if (!VendorPerson) {
            return res.status(401).send({ message: "Vendor Not Found" });
        }

        // Create a new firm instance
        const newFirm = new Firm({
            firName,
            area,
            category,
            region,
            offer,
            image, // Assign the uploaded image (if any)
            vendor: VendorPerson._id // Link the firm to the vendor
        });

        // Save the firm to the database
        const savedFirm = await newFirm.save();

        // Now add the firm ID to the vendor's firm array
        VendorPerson.firm.push(savedFirm._id);
        await VendorPerson.save(); // Save the updated vendor

        // Respond with a success message and firm data
        res.status(201).send({ message: "Firm Added successfully", firm: savedFirm });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


const deleteFirm = async(req,res)=>{
    const deleteId = req.params.firmId
    try{
        const DeletedProduct = await Firm.findByIdAndDelete(deleteId)
        if(!DeletedProduct){
            return res.status(401).send({error:"No Firm Found"})
        }
        console.log("successfully Deleted")
        res.status(201).send({message:"Firm Deleted Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// Exporting with multer middleware to handle single image upload
module.exports = {
    addFirm: [upload.single("image"), addFirm],deleteFirm // Use "image" as the field name for file input in the form
};
