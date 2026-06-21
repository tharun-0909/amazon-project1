const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json("No token");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json("Invalid token");
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json("Admin only");
    }
    next();
};

module.exports = { auth, admin };