const {
  createNotification,
  getNotifications,
} = require("../models/notification");

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addNotification = async (type, message, data, io) => {
  const notification = await createNotification(type, message, data);
  io.emit(type, notification);
};

module.exports = { getAllNotifications, addNotification };
