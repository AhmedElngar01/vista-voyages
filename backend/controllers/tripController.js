const db = require('../config/database');

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await db.query("SELECT * FROM trips");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTrip = async (req, res) => {
  const { title, location, price, days, startDate, rating, image, description } = req.body;
  try {
    const result = await db.runQuery(
      "INSERT INTO trips (title, location, price, days, startDate, rating, image, description) VALUES (?,?,?,?,?,?,?,?)",
      [title, location, price, days, startDate, rating, image, description]
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrip = async (req, res) => {
  const { id } = req.params;
  const { title, location, price, days, startDate, rating, image, description } = req.body;
  try {
    await db.runQuery(
      "UPDATE trips SET title=?, location=?, price=?, days=?, startDate=?, rating=?, image=?, description=? WHERE id=?",
      [title, location, price, days, startDate, rating, image, description, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrip = async (req, res) => {
  const { id } = req.params;
  try {
    await db.runQuery("DELETE FROM trips WHERE id=?", [id]);
    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
