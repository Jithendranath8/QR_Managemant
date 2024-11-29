const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const AnalyticsController = require('../controllers/analytics.controller');
const analyticsController = new AnalyticsController();

/**
 * @swagger
 * /api/analytics/{id}:
 *   get:
 *     summary: Get QR code analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authenticate, analyticsController.getAnalytics);

module.exports = router;