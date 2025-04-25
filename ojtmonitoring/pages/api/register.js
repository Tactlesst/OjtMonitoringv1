import db from '@/lib/db'; // Ensure this points to your database connection utility
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { first_name, last_name, email, password, role, student_id } = req.body;

  // Validate input
  if (!first_name || !last_name || !email || !password || !student_id) {
    return res.status(400).json({ message: 'First name, last name, email, password, and student ID are required' });
  }

  // Validate role
  const validRoles = ['student', 'admin', 'coordinator'];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database with the student_id
    await db.query(
      'INSERT INTO users (student_id, first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [student_id, first_name, last_name, email, hashedPassword, role || 'student'] // Default role is 'student'
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
