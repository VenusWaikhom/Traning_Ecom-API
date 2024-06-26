const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ObjectID = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productid: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    productname: {
      type: String,
      require: true,
      trim: true,
    },
    productprice: {
      type: Number,
      require: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      ref: "User",
    },
    orderdate: {
      type: Date,
      require: true,
      trim: true,
    },
    status: {
      type: String,
      require: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
