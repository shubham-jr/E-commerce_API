const catalogModel = require("../models/catalogModel");
const orderModel = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");

exports.createCatalog = catchAsync(async (req, res, next) => {
  const catalog = await catalogModel.create({
    sellerId: req.user.id,
  });
  req.body.products.forEach((products) => {
    catalog.products.push(products);
    catalog.save();
  });
  res.status(200).json({
    status: "success",
    catalog,
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await orderModel
    .find({ orderedTo: req.user.id })
    .populate({ path: "orderedBy", select: "username" })
    .select("-orderedTo");
  res.status(200).json({
    status: "success",
    orders,
  });
});
