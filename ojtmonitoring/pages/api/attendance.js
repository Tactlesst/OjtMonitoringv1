import db from '@/lib/db';
import dayjs from 'dayjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;  // Get the userId instead of assignment_id
  const studentId = parseInt(userId); // Assuming userId is the correct field for unique identification

  if (!studentId || isNaN(studentId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
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
    (!isMorning && !isCheckout && hour >= 14) || (isMorning && !isCheckout && hour >= 11);
  const status = isLate ? 'late' : 'present';

  try {
    // Check if record exists for today
    const [rows] = await db.query(
      'SELECT id, checkin_morning, checkout_morning FROM attendance WHERE student_id = ? AND date = ?',
      [studentId, date]
    );

    if (rows.length) {
      const existing = rows[0];

      // If it's morning and there's no checkin but checkout is present, mark as late
      if (isMorning && !existing.checkin_morning && existing.checkout_morning) {
        // Update status as late for the morning
        await db.query(
          `UPDATE attendance SET ${statusField} = 'late', updated_at = NOW() WHERE id = ?`,
          [existing.id]
        );
        return res.status(200).json({
          message: 'Morning session marked as late due to checkout without check-in.',
        });
      }

      // Prevent duplicate same-period check-in
      const [alreadyChecked] = await db.query(
        `SELECT ${field} FROM attendance WHERE id = ?`,
        [existing.id]
      );

      if (alreadyChecked[0][field]) {
        return res.status(409).json({ message: 'You already scanned for this period.' });
      }

      // If it's a regular check-in or check-out, update as normal
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
      // Insert new record if no existing attendance record for today
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
    console.error('Error:', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
}
