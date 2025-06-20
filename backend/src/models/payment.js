const pool = require("../config/db");

const createPayment = async (customer_id, status) => {
  const result = await pool.query(
    "INSERT INTO payments (customer_id, status) VALUES ($1, $2) RETURNING *",
    [customer_id, status]
  );
  return result.rows[0];
};

const updatePaymentStatus = async (customer_id, status) => {
  const result = await pool.query(
    "UPDATE payments SET status = $1 WHERE customer_id = $2 RETURNING *",
    [status, customer_id]
  );
  return result.rows[0];
};

const getPaymentByCustomerId = async (customer_id) => {
  const result = await pool.query(
    "SELECT * FROM payments WHERE customer_id = $1",
    [customer_id]
  );
  return result.rows[0];
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getPaymentByCustomerId,
};
