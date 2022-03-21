const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const catalogSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.ObjectId,
    unique: [true, "one seller only have one catalog!!!"],
  },
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

const catalogModel = mongoose.model("Catalog", catalogSchema);
module.exports = catalogModel;
