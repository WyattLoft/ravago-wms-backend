const express = require('express');
const cors = require('cors');            // ← add this
const app = express();
const PORT = process.env.PORT || 3001;

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────
app.use(cors());                          // ← add this line
app.use(express.json());

// ─── ROUTES ──────────────────────────────────────────────────────────────
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the WMS backend!' });
});

// (You’ll add your authRoutes and inventory routes later)

// ─── START SERVER ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
