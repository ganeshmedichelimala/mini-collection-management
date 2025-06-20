const pool = require("../config/db");

const createNotification = async (type, message, data) => {
  const result = await pool.query(
    "INSERT INTO notifications (type, message, data) VALUES ($1, $2, $3) RETURNING *",
    [type, message, JSON.stringify(data)]
  );
  return result.rows[0];
};

const getNotifications = async () => {
  const result = await pool.query(
    "SELECT * FROM notifications ORDER BY created_at DESC LIMIT 100"
  );
  return result.rows;
};

module.exports = { createNotification, getNotifications };
