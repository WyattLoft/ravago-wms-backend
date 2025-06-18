const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// GET all inventory items
router.get('/inventory', authMiddleware, (req, res) => {
  db.all('SELECT * FROM inventory', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

// GET single item by ID
router.get('/inventory/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM inventory WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!row) return res.status(404).json({ error: 'Item not found' });
    res.json(row);
  });
});

// POST new inventory item
router.post('/inventory', authMiddleware, (req, res) => {
  const { name, sku, quantity, location } = req.body;
  db.run(
    'INSERT INTO inventory (name, sku, quantity, location) VALUES (?, ?, ?, ?)',
    [name, sku, quantity, location],
    function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      db.get('SELECT * FROM inventory WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.status(201).json(row);
      });
    }
  );
});

// PUT update inventory item
router.put('/inventory/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, sku, quantity, location } = req.body;
  db.run(
    'UPDATE inventory SET name = ?, sku = ?, quantity = ?, location = ? WHERE id = ?',
    [name, sku, quantity, location, id],
    function(err) {
      if (err) return res.status(500).json({ error: 'DB error' });
      db.get('SELECT * FROM inventory WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json(row);
      });
    }
  );
});

// DELETE an inventory item
router.delete('/inventory/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM inventory WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Item deleted' });
  });
});

module.exports = router;

