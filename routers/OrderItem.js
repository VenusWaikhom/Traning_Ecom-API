const express = require("express");
const order = require("../model/OrderItem");
const Auth = require("../middleware/auth");
const Item = require("../model/Item");
const User = require("../model/user");
const pushMessage = require("../services/pushMessage");
const router = new express.Router();

router.post("/BuyNow", Auth, async (req, res) => {
  console.log(req, "REQ");
  try {
    const NewOrder = new order({
      // ...req.body,
      userid: req.user._id,
      owner: req.body.Owner,
      productid: req.body.product_id,
      productprice: req.body.product_price,
      orderdate: Date(),
      status: req.body.Status,
      productname: req.body.productname,
      isRead: false,
    });
    const Owner = await User.findOne({ _id: req.body.Owner });
    const OwnerFirebase = Owner.firebaseToken;

    console.log("OWENER", Owner.firebaseToken);

    await NewOrder.save();
    await pushMessage(
      OwnerFirebase,
      "An Item Has Set To Order",
      "thank you",
      NewOrder
    );
    res.status(200).send(NewOrder);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/GetAllOrders", async (req, res) => {
  try {
    console.log("All Order Request Hit");
    const Orders = await order.find({}).sort({ _id: -1 });
    res.status(200).send(Orders);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/updateOrder", Auth, async (req, res) => {
  const update = object.keys(req.body);
  console.log(update);
  const allowedUpdates = ["status"];
  const isValidOperation = update.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const order = await Item.findone({ _id: req.body.id });
    if (!order) {
      return res.status(404).send();
    }
    update.forEach((update) => {
      order[update] = req.body[update];
    });
    await order.save();
    res.send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/DeleteOrder/:_id", Auth, async (req, res) => {
  console.log("Delete Order API hit");
  console.log(req.params);
  try {
    const deleteOrder = await order.findOneAndDelete({ _id: req.params._id });
    if (deleteOrder) {
      return res.send(deleteOrder);
    }
    res.status(404).send({ error: "Item not found" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/User_order/:_id", Auth, async (req, res) => {
  console.log("User Order Hit");
  try {
    const user_order = await order.find({ userid: req.params._id });
    if (user_order) {
      return res.status(200).send(user_order);
    }
    res.status(404).send({ error: "No Item On Order" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
