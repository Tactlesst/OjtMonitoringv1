// pages/api/attendanceByStudent.js
import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    const { student_id } = req.query;

    const [rows] = await db.query(
      `SELECT date, status_morning, checkin_morning, checkout_morning,
              status_afternoon, checkin_afternoon, checkout_afternoon
       FROM attendance
       WHERE student_id = ?
       ORDER BY date DESC`,
      [student_id]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
