const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../models/customer");

const addCustomer = async (req, res) => {
  try {
    const { name, contact_info, outstanding_amount, due_date, status } =
      req.body;
    if (!name || !contact_info || !outstanding_amount || !due_date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const customer = await createCustomer({
      name,
      contact_info,
      outstanding_amount,
      due_date,
      status,
    });
    // Emit real-time event
    req.app.get("io").emit("customerAdded", customer);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const { name, status, due_date, sort_by, sort_order } = req.query;
    const filter = { name, status, due_date };
    const sort = { by: sort_by, order: sort_order };
    const customers = await getCustomers(filter, sort);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const editCustomer = async (req, res) => {
  try {
    const customer = await updateCustomer(req.params.id, req.body);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeCustomer = async (req, res) => {
  try {
    await deleteCustomer(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomer,
  editCustomer,
  removeCustomer,
};
