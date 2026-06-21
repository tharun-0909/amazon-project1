const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/authMiddleware");

// Register
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
        role: role || "user"
    });

    res.json(user);
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    res.json({ token, user });
});

// Get current user
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("name email role");
        res.json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;