const app = require("express")();
const bodyParser = require("body-parser");

const userRoute = require("./routes/userRoutes");
const sellerRoute = require("./routes/sellerRoutes");
const buyerRoute = require("./routes/buyerRoutes");

const globalErrorHandler = require("./controllers/errorController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", userRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/buyer", buyerRoute);

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `${req.originalUrl} not found...`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
