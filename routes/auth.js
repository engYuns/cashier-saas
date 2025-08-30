const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1 AND role IN ($2, $3)',
      [email, 'superadmin', 'cashier']
    );
    
    console.log('User found:', result.rows.length > 0);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    console.log('Password valid:', validPassword);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenant_id: user.tenant_id
      }
    });
  } catch (error) {
    console.log('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
