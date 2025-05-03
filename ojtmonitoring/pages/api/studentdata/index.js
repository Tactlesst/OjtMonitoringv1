import db from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { search } = req.query; // Get search query parameter

    try {
      let query = 'SELECT id, student_id, first_name, last_name, email, role, disabled FROM users WHERE role = "student"';
      let params = [];

      // Add search filter if 'search' query is provided
      if (search) {
        query += ' AND (first_name LIKE ? OR last_name LIKE ? OR student_id LIKE ?)';
        params = [`%${search}%`, `%${search}%`, `%${search}%`]; // Search in first name, last name, and student ID
      }

      const [students] = await db.query(query, params);
      res.status(200).json(students);
    } catch (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ message: 'Error fetching students' });
    }
  } else if (req.method === 'POST') {
    const { first_name, last_name, email, student_id, password, disabled } = req.body;

    if (!first_name || !last_name || !email || !student_id || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (first_name, last_name, email, student_id, password, role, disabled) VALUES (?, ?, ?, ?, ?, "student", ?)';
      const params = [first_name, last_name, email, student_id, hashedPassword, disabled];

      await db.query(query, params);
      res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
      console.error('Error adding student:', err);
      res.status(500).json({ message: 'Error adding student' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
