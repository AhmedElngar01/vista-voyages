const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/database'); // Initialize DB

const tripRoutes = require('./routes/trips');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const discountRoutes = require('./routes/discounts');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/discounts', discountRoutes);

app.get('/', (req, res) => {
  res.send('Vista Voyages API (SQLite) is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
