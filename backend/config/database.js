const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../vista.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});


db.query = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    this.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

db.getOne = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    this.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

db.runQuery = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    this.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

function initDb() {
  db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT,
      gender TEXT, birthDate TEXT, phone TEXT, city TEXT, role TEXT DEFAULT 'user'
    )`);


    db.run(`CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, location TEXT, price TEXT, days TEXT,
      startDate TEXT, rating REAL, image TEXT, description TEXT
    )`);

  
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user TEXT, email TEXT, phone TEXT, trip TEXT,
      date TEXT, status TEXT, price TEXT, guests INTEGER, payment TEXT
    )`);

 
    db.run(`CREATE TABLE IF NOT EXISTS discounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT, value INTEGER
    )`);

   
    db.get("SELECT count(*) as count FROM trips", (err, row) => {
      if (row && row.count === 0) {
        const insert = db.prepare("INSERT INTO trips (title, location, price, days, startDate, rating, image, description) VALUES (?,?,?,?,?,?,?,?)");
        insert.run("Santorini Sunset", "Greece", "$1,200", "5 Days", "2024-06-15", 4.8, "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2938&auto=format&fit=crop", "Experience the breathtaking sunsets of Oia and explore the volcanic beaches.");
        insert.run("Bali Tropical Bliss", "Indonesia", "$850", "7 Days", "2024-07-10", 4.9, "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop", "Immerse yourself in the spiritual and natural beauty of Bali.");
        insert.run("Swiss Alps Adventure", "Switzerland", "$2,100", "6 Days", "2024-08-05", 5.0, "https://images.unsplash.com/photo-1531310197838-6484fe6a3552?q=80&w=2838&auto=format&fit=crop", "A journey through the majestic Swiss Alps. Ride the Glacier Express.");
        insert.run("Kyoto Cherry Blossoms", "Japan", "$1,800", "8 Days", "2024-04-01", 4.9, "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2940&auto=format&fit=crop", "Witness the magical Sakura season in Kyoto.");
        insert.finalize();
        console.log("Seeded Trips");
      }
    });

    db.get("SELECT count(*) as count FROM discounts", (err, row) => {
        if (row && row.count === 0) {
            const insert = db.prepare("INSERT INTO discounts (code, value) VALUES (?,?)");
            insert.run("WELCOME10", 10);
            insert.run("SUMMER20", 20);
            insert.finalize();
            console.log("Seeded Discounts");
        }
    });


    db.get("SELECT count(*) as count FROM users WHERE email = 'admin@vista.com'", (err, row) => {
        if (row && row.count === 0) {
            db.run("INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)", ["Admin", "User", "admin@vista.com", "admin123", "admin"]);
            console.log("Seeded Admin User");
        }
    });

  });
}

module.exports = db;
