const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    time: {
      type: String,
      default: new Date().toLocaleTimeString(),
      index: true,
    },
    status: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
