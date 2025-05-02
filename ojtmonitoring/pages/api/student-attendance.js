import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query; // id from users table

  if (!id) {
    return res.status(400).json({ message: 'Missing user id' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC',
      [id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
