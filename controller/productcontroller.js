const multer = require("multer");
const Firm = require("../models/Firm")
const product = require("../models/product")

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

const addProduct = async (req, res) => {
    const { productName, price, category, bestSeller, description } = req.body
    const image = req.file ? req.file.filename : undefined; // Get image filename if uploaded
    try {
        const firmId = req.params.id
        const firm = await Firm.findById(firmId)
        if (!firm) {
            return res.status(401).send({ message: "Firm Not Found" })
        }
        const productData = new product({
            productName,
            price,
            category,
            bestSeller,
            description,
            image,
            firm: firmId
        });

        const savedproduct = await productData.save();
        firm.product.push(savedproduct._id)
        await firm.save()
        res.status(201).json(savedproduct)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}



const getproduct = async (req, res) => {
    const firmId = req.params.id;
    try {
        // Find the firm by ID
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        const Restaurantname = firm.firName
        // Find products associated with the firm
        const products = await product.find({ firm: firmId });
        
        res.status(200).json({Restaurantname,products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const deleteProductId = async(req,res)=>{
    const deleteId = req.params.productid
    try{
        const DeletedProduct = await product.findByIdAndDelete(deleteId)
        if(!DeletedProduct){
            return res.status(401).send({error:"No Product Found"})
        }
        console.log("successfully Deleted")
        res.status(201).send({message:"Product Deleted Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Exporting with multer middleware to handle single image upload
module.exports = {
    addProduct: [upload.single("image"), addProduct],
    getproduct,deleteProductId // Exporting `getProduct`
};
