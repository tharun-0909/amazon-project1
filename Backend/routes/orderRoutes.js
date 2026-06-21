const router = require("express").Router();
const Order = require("../models/Order");
const { auth,admin } = require("../middleware/authMiddleware");


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


// Get Logged-in User Orders
router.get("/myorders", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id
    })
      .populate("productId", "productId name price");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

//total orders
router.get("/all", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId", "name price")
      .populate("userId", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;