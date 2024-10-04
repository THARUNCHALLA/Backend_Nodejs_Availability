const express = require("express")

const {addFirm,deleteFirm} = require("../controller/firmcontroller")

const verifyToken = require("../middleWare/verifyToken");

const router = express.Router();
const path = require('path');

router.post("/add-firm",verifyToken,addFirm)
router.delete("/:firmId",deleteFirm)
router.get("uploads/:ImageName",(req,res)=>{
    const imageName = req.params.ImageName
    const imagePath = path.join(__dirname,"..","uploads",imageName)
    res.setHeader("Content-Type", "image/jpeg");
    res.sendFile(imagePath,(err)=>{
        if(err){
            console.error("Error sending file:", err);
            res.status(404).send("Image not found");
        }
    })
})

module.exports = router
