const xlsx = require("xlsx");
const fs = require("fs");
const { createCustomer } = require("../models/customer");
const path = require("path");

const uploadExcel = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const filePath = req.file.path;
  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    let added = 0,
      failed = 0,
      errors = [];
    for (const row of data) {
      const { name, contact_info, outstanding_amount, due_date, status } = row;
      if (
        !name ||
        !contact_info ||
        !outstanding_amount ||
        !due_date ||
        !status
      ) {
        failed++;
        errors.push({ row, reason: "Missing required fields" });
        continue;
      }
      try {
        await createCustomer({
          name,
          contact_info,
          outstanding_amount,
          due_date,
          status,
        });
        added++;
      } catch (err) {
        failed++;
        errors.push({ row, reason: "DB error or duplicate" });
      }
    }
    fs.unlinkSync(filePath);
    res.json({ added, failed, errors });
  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.status(500).json({ message: "Error processing file" });
  }
};

const downloadTemplate = (req, res) => {
  const templatePath = path.join(
    __dirname,
    "../../templates/customer_upload_template.xlsx"
  );
  res.download(templatePath, "customer_upload_template.xlsx");
};

module.exports = { uploadExcel, downloadTemplate };
