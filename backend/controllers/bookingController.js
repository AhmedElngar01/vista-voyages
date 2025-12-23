const db = require('../config/database');

exports.getBookings = async (req, res) => {
  try {
    const bookings = await db.query("SELECT * FROM bookings ORDER BY id DESC");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  const { user, email, phone, trip, date, guests, payment, price } = req.body;
  try {
    const result = await db.runQuery(
      "INSERT INTO bookings (user, email, phone, trip, date, status, guests, payment, price) VALUES (?,?,?,?,?,?,?,?,?)",
      [user, email, phone, trip, date, "Confirmed", guests, payment, price]
    );
    res.status(201).json({ id: result.id, ...req.body, status: "Confirmed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
