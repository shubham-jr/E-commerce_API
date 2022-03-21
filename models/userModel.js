const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: [true, "username required!!!"],
  },
  password: {
    type: String,
    minlength: [6, "password size must be 6 or larger!!!"],
    required: [true, "a user must have a password!!!"],
  },
});

userSchema.methods.checkCorrectPassword = async function (plainText, encPass) {
  return await bcrypt.compare(plainText, encPass);
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
