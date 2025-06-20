const pool = require("../config/db");

const createCustomer = async (data) => {
  const { name, contact_info, outstanding_amount, due_date, status } = data;
  const result = await pool.query(
    "INSERT INTO customers (name, contact_info, outstanding_amount, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, contact_info, outstanding_amount, due_date, status]
  );
  return result.rows[0];
};

const getCustomers = async (filter = {}, sort = {}) => {
  let query = "SELECT * FROM customers";
  const conditions = [];
  const values = [];
  if (filter.name) {
    values.push(`%${filter.name}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }
  if (filter.status) {
    values.push(filter.status);
    conditions.push(`status = $${values.length}`);
  }
  if (filter.due_date) {
    values.push(filter.due_date);
    conditions.push(`due_date = $${values.length}`);
  }
  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }
  if (sort.by) {
    query += ` ORDER BY ${sort.by} ${sort.order === "desc" ? "DESC" : "ASC"}`;
  }
  const result = await pool.query(query, values);
  return result.rows;
};

const getCustomerById = async (id) => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const updateCustomer = async (id, data) => {
  const { name, contact_info, outstanding_amount, due_date, status } = data;
  const result = await pool.query(
    "UPDATE customers SET name = $1, contact_info = $2, outstanding_amount = $3, due_date = $4, status = $5 WHERE id = $6 RETURNING *",
    [name, contact_info, outstanding_amount, due_date, status, id]
  );
  return result.rows[0];
};

const deleteCustomer = async (id) => {
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
