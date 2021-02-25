const express = require("express");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const connect = require("./connection");
const authenticationRouter = require("./routes/authentication");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", authenticationRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", orderRouter);
app.use(function (req, res, next) {
  res.status(404).send("Not found");
});

// error handler

app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send("error");
});

module.exports = app;
