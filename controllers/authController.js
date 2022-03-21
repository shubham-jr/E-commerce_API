const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const bcrypt = require("bcryptjs");

exports.signup = catchAsync(async (req, res, next) => {
  const user = await userModel.create(req.body);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  user.password = undefined;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure:true,
    httpOnly: true,
  };
  res.cookie("jwt", token, options);
  res.status(201).json({
    status: "success",
    token,
    user,
  });
});

exports.protect = async (req, res, next) => {
  let token;
  console.log(req.cookies);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return next(new appError(`You are not loggedIn :(  Please Login!!`, 404));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById({ _id: decoded.id });
  if (user == null)
    return next(
      new appError(`token is incorrect or expired!!! Login Again!!!`, 404)
    );
  req.user = user;
  next();
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next(new appError(`Please provide username & password`, 404));
  const user = await userModel.findOne({ username }).select("+password");
  console.log(username);
  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new appError(`wrong username or password!!!`, 404));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure:true,
    httpOnly: true,
  };
  res.cookie("jwt", token, options);
  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(roles, req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new appError(
          `you are not allowed to access this route. This route is for ${roles}s`,
          403
        )
      );
    }
    next();
  };
};
