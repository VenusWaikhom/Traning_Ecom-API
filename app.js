const express = require("express");
const path = require("path");
require("./db/mongoose");
const userRouter = require("./routers/user");
const itemRouter = require("./routers/item");
const orderItemRouter = require("./routers/OrderItem");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(userRouter);

app.use(itemRouter);

app.use(orderItemRouter);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(port, () => {
  console.log("server listening on port " + port);
});
