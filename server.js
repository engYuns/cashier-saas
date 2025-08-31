const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;  // Backend runs on port 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Test database connection
const db = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static files from React build (for monolithic deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  // Handle React routing - send all non-API requests to React
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    }
  });
}

// API routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Cashier SaaS API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test database route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ 
      message: 'Database connected successfully!', 
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
