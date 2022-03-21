const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");
const buyerController = require("../controllers/buyerController");

Router.route("/list-of-sellers").get(
  authController.protect,
  authController.restrictTo("buyer"),
  buyerController.getAllSellers
);
Router.route("/seller-catalog/:seller_id").get(
  authController.protect,
  authController.restrictTo("buyer"),
  buyerController.getSellerCatalog
);

Router.route("/create-order/:seller_id").post(
  authController.protect,
  authController.restrictTo("buyer"),
  buyerController.createOrder
);
module.exports = Router;
