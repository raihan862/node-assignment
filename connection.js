/*
This module contain the Connection Configuration
*/
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/MyShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => {
    console.log("form mongo error" + err);
  });

const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database connection Stablished");
});
module.exports = mongoose;
