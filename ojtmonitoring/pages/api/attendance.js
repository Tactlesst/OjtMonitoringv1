// pages/api/attendance.js
import db from '@/lib/db';
import dayjs from 'dayjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { assignment_id } = req.body;
  const studentId = parseInt(assignment_id); // assuming this is student_id

  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  const now = dayjs();
  const time = now.format('HH:mm:ss');
  const date = now.format('YYYY-MM-DD');
  const hour = now.hour();

  // Determine which field to update
  const isMorning = hour < 12;
  const isCheckout = hour >= 11 && hour < 13 || hour >= 16; // example logic
  const field = isMorning
    ? isCheckout
      ? 'checkout_morning'
      : 'checkin_morning'
    : isCheckout
    ? 'checkout_afternoon'
    : 'checkin_afternoon';

  const statusField = isMorning ? 'status_morning' : 'status_afternoon';
  const isLate =
    (!isMorning && !isCheckout && hour >= 13) || (isMorning && !isCheckout && hour >= 8);
  const status = isLate ? 'late' : 'present';

  try {
    // Check if record exists for today
    const [rows] = await db.query(
      'SELECT id FROM attendance WHERE student_id = ? AND date = ?',
      [studentId, date]
    );

    if (rows.length) {
      const existing = rows[0];

      // Prevent duplicate same-period check-in
      const [alreadyChecked] = await db.query(
        `SELECT ${field} FROM attendance WHERE id = ?`,
        [existing.id]
      );

      if (alreadyChecked[0][field]) {
        return res.status(409).json({ message: 'You already scanned for this period.' });
      }

      // Update record
      await db.query(
        `UPDATE attendance SET ${field} = ?, ${statusField} = ?, updated_at = NOW() WHERE id = ?`,
        [time, status, existing.id]
      );

      return res.status(200).json({
        message: `Checked in for ${isMorning ? 'morning' : 'afternoon'} ${
          isLate ? 'as late' : 'successfully'
        }.`,
      });
    } else {
      // Insert new record
      await db.query(
        `INSERT INTO attendance (student_id, ${field}, ${statusField}, date) VALUES (?, ?, ?, ?)`,
        [studentId, time, status, date]
      );

      return res.status(200).json({
        message: `Checked in for ${isMorning ? 'morning' : 'afternoon'} ${
          isLate ? 'as late' : 'successfully'
        }.`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
}
