const express = require("express");
const Item = require("../model/Item");
const Auth = require("../middleware/auth");
const fileUploader = require("../middleware/multer");
const multer = require("multer");
const pushMessage = require("../services/pushMessage");
const router = new express.Router();

var upload = multer();

router.post("/items", Auth, fileUploader, async (req, res) => {
  console.log(req, "REQ");
  try {
    const newItem = new Item({
      ...req.body,
      owner: req.user._id,
      image1:
        req.file.destination + "/" + req.file.filename?.replaceAll(" ", ""),
    });
    let dummyT =
      "f-ZAcY_xyYsZpzhWJSxxgT:APA91bHUHYR0tTEo7NQMXA1XmkL5rjFL9PLUXc0gA2oY_RJATz_MFsm4ihHtWa_DJeQlq65MB6B-tOVuc8_IVFzYwkEWLVJ6D_pz2nG_OUJBtPOIYb9wiiJnPDIgWywS864hWLjsSpmw";
    await pushMessage(dummyT, "You have listed the product", "thank you");
    // console.log("req", req);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).send({ error: "Item not found" });
    }
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/items", async (req, res) => {
  try {
    console.log(req.query, "QUERY");
    let items = [];
    if (req.query.search && req.query.search?.length > 3) {
      items = await Item.find({
        $text: { $search: req.query.search },
      }).sort({ _id: -1 });
    } else if (req.query.filter) {
      items = await Item.find({
        $text: { $filter: req.query.flter },
      });
    } else {
      items = await Item.find({}).sort({ _id: -1 });
    }
    let dummyT =
      "f-ZAcY_xyYsZpzhWJSxxgT:APA91bHUHYR0tTEo7NQMXA1XmkL5rjFL9PLUXc0gA2oY_RJATz_MFsm4ihHtWa_DJeQlq65MB6B-tOVuc8_IVFzYwkEWLVJ6D_pz2nG_OUJBtPOIYb9wiiJnPDIgWywS864hWLjsSpmw";
    pushMessage(dummyT, "You have listed the product", "thank you").catch((e) =>
      console.log(e)
    );

    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/updateItem", Auth, upload.any(), async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ["id", "producename", "price", "image1"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const item = await Item.findOne({ _id: req.body.id });
    if (!item) {
      return res.status(404).send();
    }
    updates.forEach((update) => (item[update] = req.body[update]));

    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/items/:_id", Auth, async (req, res) => {
  console.log("Delete Product API hit");
  console.log(req.params._id);
  try {
    const deletedItem = await Item.findOneAndDelete({ _id: req.params._id });
    if (deletedItem) {
      return res.send(deletedItem);
    }
    res.status(404).send({ error: "Item not found" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
