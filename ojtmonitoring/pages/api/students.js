import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT id AS user_id, student_id, first_name, last_name
       FROM users
       WHERE role = 'student' AND disabled = 0`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
