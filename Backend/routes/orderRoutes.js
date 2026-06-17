const router = require("express").Router();
const Order = require("../models/Order");
const { auth } = require("../middleware/authMiddleware");


// Place Order (User)
router.post("/", auth, async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user.id,
      productId: req.body.productId,
      quantity: req.body.quantity
    });

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});


// Get All Orders (Admin)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name")
      .populate("productId", "productId name price");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});


module.exports = router;