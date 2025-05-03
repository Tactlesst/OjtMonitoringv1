// pages/api/coordinators/[id].js
import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { first_name, last_name, email, password, role, disabled } = req.body;

    try {
      let query, params;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        query = 'UPDATE users SET first_name=?, last_name=?, email=?, password=?, role=?, disabled=? WHERE id=?';
        params = [first_name, last_name, email, hashedPassword, role, disabled, id];
      } else {
        query = 'UPDATE users SET first_name=?, last_name=?, email=?, role=?, disabled=? WHERE id=?';
        params = [first_name, last_name, email, role, disabled, id];
      }

      await db.query(query, params);
      res.status(200).json({ message: 'Coordinator updated successfully' });
    } catch (error) {
      console.error('Error updating coordinator:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
