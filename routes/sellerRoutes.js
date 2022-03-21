const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");
const sellerController = require("../controllers/sellerController");
Router.route("/create-catalog").post(
  authController.protect,
  authController.restrictTo("seller"),
  sellerController.createCatalog
);
Router.route("/orders").get(
  authController.protect,
  authController.restrictTo("seller"),
  sellerController.getAllOrders
);
module.exports = Router;
