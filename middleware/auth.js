const jwt = require("jsonwebtoken");
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {

        return res.status(401).json({ error: "Unauthorized" });

    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authMiddleware;