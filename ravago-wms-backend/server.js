const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./wms.db', (err) => {
  if (err) return console.error('Database error:', err.message);
  console.log('Connected to SQLite database.');
});

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the WMS backend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
