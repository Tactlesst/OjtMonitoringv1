import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { first_name, last_name, email, password, role, disabled } = req.body;

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new coordinator into the database
      await db.query(
        'INSERT INTO users (first_name, last_name, email, password, role, disabled) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, hashedPassword, role, disabled]
      );

      // Return a success message
      res.status(200).json({ message: 'Coordinator added successfully' });
    } catch (error) {
      console.error('Error inserting coordinator:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
