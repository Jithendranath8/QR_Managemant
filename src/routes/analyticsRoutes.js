const express = require("express");
const { getQRCodeAnalytics } = require("../controllers/analyticsController");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

router.get("/:id/analytics", authenticate, getQRCodeAnalytics);

module.exports = router;
