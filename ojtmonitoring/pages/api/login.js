import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // 1. Fetch user from DB including student_id and disabled status
    const [users] = await pool.query(
      `SELECT id, email, password, role, first_name, last_name, student_id, disabled 
       FROM users WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    // 2. Check if user is disabled
    if (user.disabled) {
      return res.status(403).json({ message: 'Account is disabled. Contact your administrator.' });
    }

    // 3. Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Log login
    await pool.query('INSERT INTO login_logs (user_id) VALUES (?)', [user.id]);

    // 5. Create JWT
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
        student_id: user.student_id || null,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 6. Respond
    return res.status(200).json({
      token,
      role: user.role,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        student_id: user.student_id || null,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
