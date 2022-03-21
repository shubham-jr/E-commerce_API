const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "product must have a name!!!"],
  },
  price: {
    type: Number,
    required: [true, "product must have a price!!!"],
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
