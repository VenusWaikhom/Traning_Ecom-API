const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const itemSchema = new mongoose.Schema(
  {
    owner: {
      type: ObjectID,
      required: true,
      ref: "User",
    },
    producename: {
      type: String,
      required: true,
      trim: true,
      index: true,
      text: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
      text: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image1: {
      type: String,
      // required: true,
      trim: true,
    },
    image2: {
      type: Object,
      // required: true,
    },
    image3: {
      type: Object,
      // required: true,
    },
    image4: {
      type: Object,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
