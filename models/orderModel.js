const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
  orderedTo: { type: mongoose.Schema.ObjectId, ref: "User" },
  products: {
    type: [
      {
        name: {
          type: String,
          trim: true,
          // required: [true, "product must have a name!!!"],
        },
        price: {
          type: Number,
          // required: [true, "product must have a price!!!"],
        },
      },
    ],
    default: [],
  },
});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
