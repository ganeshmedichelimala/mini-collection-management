const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const customerRoutes = require("./routes/customers");
app.use("/api/customers", customerRoutes);

const paymentRoutes = require("./routes/payments");
app.use("/api/payments", paymentRoutes);

const notificationRoutes = require("./routes/notifications");
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Mini Collection Management System Backend Running");
});

module.exports = app;
