const mongoose = require("mongoose");

// Connection
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
// const connectedMongoose = mongoose;
module.exports = mongoose;
