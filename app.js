const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const path= require("path"); 
const authenticationRouter = require("./routes/authentication");
const fileupload = require("express-fileupload")
const bodyParser = require("body-parser")
// Database Connection Object
const connect = require("./connection");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static( __dirname + '/uploads'))
// app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.urlencoded());
 app.use(fileupload());
//Route Configuration
app.use("/", authenticationRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", orderRouter);

//Handle Unknown Path
app.use((req, res, next) => {
  res.status(404).send("Not found");
});

// error handler

app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err.message || err);
});

module.exports = app;
