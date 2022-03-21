const userModel = require("../models/userModel");
const catalogModel = require("../models/catalogModel");
const orderModel = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const bcrypt = require("bcryptjs");

exports.getAllSellers = catchAsync(async (req, res, next) => {
  const sellers = await userModel
    .find({ role: "seller" })
    .select("username role");
  res.status(201).json({
    status: "success",
    sellers,
  });
});

exports.getSellerCatalog = catchAsync(async (req, res, next) => {
  const catalog = await catalogModel
    .find({ sellerId: req.params.seller_id })
    .select("products");
  res.status(201).json({
    status: "success",
    catalog,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  let order = await orderModel.create({
    orderedBy: req.user.id,
    orderedTo: req.params.seller_id,
  });
  order = await orderModel.populate(order, {
    path: "orderedTo",
    select: "username",
  });
  order = await orderModel.populate(order, {
    path: "orderedBy",
    select: "username",
  });
  req.body.products.forEach((product) => {
    order.products.push(product);
    order.save();
  });
  res.status(200).json({
    status: "success",
    order,
  });
});
