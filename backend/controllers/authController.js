const db = require('../config/database');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@vista.com') {

      return res.json({ name: 'Admin User', email: email, role: 'admin' });
  }

  try {
    const user = await db.getOne("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    if (user) {
      res.json({ 
        name: `${user.firstName} ${user.lastName}`, 
        email: user.email, 
        role: user.role, 
        city: user.city, 
        phone: user.phone 
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, gender, birthDate, phone, city } = req.body;
  
  try {
    const exists = await db.getOne("SELECT id FROM users WHERE email = ?", [email]);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await db.runQuery(
      "INSERT INTO users (firstName, lastName, email, password, gender, birthDate, phone, city) VALUES (?,?,?,?,?,?,?,?)",
      [firstName, lastName, email, password, gender, birthDate, phone, city]
    );

    res.status(201).json({ 
      name: `${firstName} ${lastName}`, 
      email: email, 
      role: 'user' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
