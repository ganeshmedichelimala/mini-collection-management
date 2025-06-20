const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  addCustomer,
  getAllCustomers,
  getCustomer,
  editCustomer,
  removeCustomer,
} = require("../controllers/customerController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management endpoints
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact_info
 *               - outstanding_amount
 *               - due_date
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               contact_info:
 *                 type: string
 *               outstanding_amount:
 *                 type: number
 *               due_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all customers (with filtering and sorting)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: due_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort_order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: List of customers
 *
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 *
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Customer updated
 *       404:
 *         description: Customer not found
 *
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted
 *       404:
 *         description: Customer not found
 *
 * /api/customers/upload-excel:
 *   post:
 *     summary: Bulk upload customers via Excel
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Import summary
 *       400:
 *         description: No file uploaded
 */

router.post("/", auth, addCustomer);
router.get("/", auth, getAllCustomers);
router.get("/:id", auth, getCustomer);
router.put("/:id", auth, editCustomer);
router.delete("/:id", auth, removeCustomer);

// Excel upload endpoint (to be implemented)
router.post("/upload-excel", auth, upload.single("file"), (req, res) => {
  // TODO: Implement Excel upload logic
  res.status(501).json({ message: "Not implemented" });
});

module.exports = router;
