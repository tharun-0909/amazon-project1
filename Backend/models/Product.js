const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId:String,
    name:String,
    price:Number,
    rating:Number,
    image:String
});

module.exports = mongoose.model("Product",productSchema);