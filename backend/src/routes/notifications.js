const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  getAllNotifications,
} = require("../controllers/notificationController");

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification endpoints
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */

router.get("/", auth, getAllNotifications);

module.exports = router;
