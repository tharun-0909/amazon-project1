const router = require("express").Router();
const Product = require("../models/Product");
const {auth,admin} = require("../middleware/authMiddleware");

router.get("/", async(req,res)=>{
    const products = await Product.find();
    res.json(products);
});

router.post("/", auth, admin, async(req,res)=>{
    const product = await Product.create(req.body);
    res.json(product);
});

router.put("/:id", auth, admin, async(req,res)=>{
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(updated);
});

router.delete("/:id", auth, admin, async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.json("Deleted");
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

module.exports = router;