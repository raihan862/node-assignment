/*
This module contain the Connection Configuration
*/
const mongoose = require("mongoose");
// mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

db.on("error", (err) => {});
db.once("open", () => {});
module.exports = mongoose;
