// Example API handler in /api/attendance/find.js
import db from '@/lib/db';

export default async function handler(req, res) {
  const { userId, date } = req.query;

  try {
    const [rows] = await db.query(
      'SELECT * FROM attendance WHERE student_id = ? AND date = ? LIMIT 1',
      [userId, date]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    return res.status(200).json({ attendance: rows[0] });
  } catch (err) {
    return res.status(500).json({ message: 'DB error', error: err.message });
  }
}
