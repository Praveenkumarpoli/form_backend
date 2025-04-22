// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bhaskar@321',
  database: 'kalpana',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// API to handle form submission
app.post('/api/submit', (req, res) => {
  const { name, email, phone, age, gender, address, skills } = req.body;

  const query = `
    INSERT INTO users (name, email, phone, age, gender, address, skills) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const skillsStr = skills.join(',');

  db.query(query, [name, email, phone, age, gender, address, skillsStr], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving data');
    }
    res.status(200).send('Data saved successfully');
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
