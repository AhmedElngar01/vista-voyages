const db = require('../config/database');

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await db.query("SELECT * FROM discounts");
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addDiscount = async (req, res) => {
  const { code, value } = req.body;
  try {
    const result = await db.runQuery("INSERT INTO discounts (code, value) VALUES (?,?)", [code, value]);
    res.status(201).json({ id: result.id, code, value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDiscount = async (req, res) => {
  const { id } = req.params;
  try {
    await db.runQuery("DELETE FROM discounts WHERE id=?", [id]);
    res.json({ message: "Discount deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
