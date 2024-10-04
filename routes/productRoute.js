const express = require("express")

const {addProduct,getproduct,deleteProductId} = require("../controller/productcontroller")

const router = express.Router();

const path = require("path")

router.post("/add-product/:id",addProduct)
router.get("/:id/products",getproduct)
router.delete("/:productid",deleteProductId)
router.get("/uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "..", "uploads", imageName);

    res.setHeader("Content-Type", "image/jpeg");
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(404).send("Image not found");
        }
    });
});

module.exports = router