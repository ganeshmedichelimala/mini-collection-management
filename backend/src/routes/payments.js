const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  mockPayment,
  getPaymentStatus,
} = require("../controllers/paymentController");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 */

/**
 * @swagger
 * /api/payments/mock/{customerId}:
 *   post:
 *     summary: Mark a customer payment as pending or completed
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Payment updated
 *       400:
 *         description: Invalid status
 *
 * /api/payments/status/{customerId}:
 *   get:
 *     summary: Get payment status for a customer
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment status
 *       404:
 *         description: Payment not found
 */

router.post("/mock/:customerId", auth, mockPayment);
router.get("/status/:customerId", auth, getPaymentStatus);

module.exports = router;
