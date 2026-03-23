// src/middleware/authMiddleware.js
const checkPremium = (req, res, next) => {
    const user = req.user; // Get user from your Auth provider
    if (user.isPremium) {
        next(); // Allow access to premium data
    } else {
        res.status(403).json({ error: "Premium Subscription Required" });
    }
};