const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String, //Because of Dollar symbal
        required:true
    },
    category:{
        type:[{
            type:String,
            enum:["veg","Non-veg"]
     } ]
    },
    image:{
        type:String
        //required:true
    },
    bestSeller:{
        type:String
        //required:true
    },
    description:{
        type:String,
        required:true
    },
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Firm" // Referencing the "Firm" model correctly
        }
    ]
})

const product = mongoose.model("product",productSchema)

module.exports = product