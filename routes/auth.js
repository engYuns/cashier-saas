const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/database');
const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  
  // Demo credentials for testing (remove in production)
  const demoUsers = [
    {
      id: 1,
      email: 'superadmin',
      password: 'admin123',
      role: 'superadmin',
      tenant_id: null
    },
    {
      id: 2,
      email: 'cashier@demo.com',
      password: 'cashier123',
      role: 'cashier',
      tenant_id: 1
    }
  ];
  
  // Check demo users first
  const demoUser = demoUsers.find(user => 
    (user.email === email || user.email === email.toLowerCase()) && 
    user.password === password
  );
  
  if (demoUser) {
    console.log('Demo user login successful:', demoUser.email);
    return res.json({ 
      message: 'Login successful',
      user: {
        id: demoUser.id,
        email: demoUser.email,
        role: demoUser.role,
        tenant_id: demoUser.tenant_id
      }
    });
  }
  
  // Try database authentication (if database is available)
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
    console.log('Database login error:', error);
    console.log('Falling back to demo mode for mobile/deployment testing');
    return res.status(401).json({ error: 'Invalid credentials - please use demo credentials' });
  }
});

module.exports = router;
