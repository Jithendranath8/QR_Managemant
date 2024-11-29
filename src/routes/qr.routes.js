const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.middleware');
const QRController = require('../controllers/qr.controller');
const qrController = new QRController();

/**
 * @swagger
 * /api/qr/static:
 *   post:
 *     summary: Generate a static QR code
 *     tags: [QR Codes]
 *     security:
 *       - bearerAuth: []
 */
router.post('/static', authenticate, qrController.generateStaticQR);

/**
 * @swagger
 * /api/qr/dynamic:
 *   post:
 *     summary: Generate a dynamic QR code
 *     tags: [QR Codes]
 *     security:
 *       - bearerAuth: []
 */
router.post('/dynamic', authenticate, qrController.generateDynamicQR);

/**
 * @swagger
 * /api/qr/{id}/update:
 *   put:
 *     summary: Update a dynamic QR code URL
 *     tags: [QR Codes]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id/update', authenticate, qrController.updateDynamicQR);

/**
 * @swagger
 * /api/qr/{id}/track:
 *   post:
 *     summary: Track a QR code scan event
 *     tags: [QR Codes]
 */
router.post('/:id/track', qrController.trackEvent);

/**
 * @swagger
 * /api/qr/{id}/events:
 *   get:
 *     summary: Get QR code events
 *     tags: [QR Codes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id/events', authenticate, qrController.getEvents);

/**
 * @swagger
 * /api/qr/my-codes:
 *   get:
 *     summary: Get user's QR codes
 *     tags: [QR Codes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/my-codes', authenticate, qrController.getMyCodes);

module.exports = router;