const {
  createPayment,
  updatePaymentStatus,
  getPaymentByCustomerId,
} = require("../models/payment");
const { getCustomerById } = require("../models/customer");

const mockPayment = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { status } = req.body;
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    let payment = await getPaymentByCustomerId(customerId);
    if (!payment) {
      payment = await createPayment(customerId, status);
    } else {
      payment = await updatePaymentStatus(customerId, status);
    }
    // Real-time notification
    if (status === "completed") {
      req.app.get("io").emit("paymentReceived", { customerId });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const { customerId } = req.params;
    const payment = await getPaymentByCustomerId(customerId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const checkOverdue = async (customer) => {
  const payment = await getPaymentByCustomerId(customer.id);
  const dueDate = new Date(customer.due_date);
  const now = new Date();
  if (dueDate < now && (!payment || payment.status !== "completed")) {
    return true;
  }
  return false;
};

module.exports = { mockPayment, getPaymentStatus, checkOverdue };
