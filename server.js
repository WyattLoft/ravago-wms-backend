const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── ROUTE IMPORTS ─────────────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');  // ← ADD THIS

// ─── ROUTE MOUNTING ────────────────────────────────────────────────────────
app.use('/api', authRoutes);
app.use('/api', inventoryRoutes);                         // ← AND THIS

app.get('/', (req, res) => {
  res.send('Ravago WMS Backend is Live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
