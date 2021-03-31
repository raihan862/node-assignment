const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    details: {
      type: Object,
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
    tax:{
      type: String,
      required: true,
    },
    shipping:{
      type: Number,
      required: true,
    },
    totalOrderPrice:{
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);
orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("orders", orderSchema);
