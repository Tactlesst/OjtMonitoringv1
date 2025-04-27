// pages/api/attendance/create.js
import db from '@/lib/db';
import dayjs from 'dayjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const currentDate = dayjs().format('YYYY-MM-DD'); // Get today's date
      // Get all users (only 'id' and 'student_id')
      const [users] = await db.execute('SELECT id FROM users WHERE disabled = 0'); 

      // Create an array of promises for checking and inserting attendance records
      const promises = users.map(async (user) => {
        const [existingRecord] = await db.execute(
          'SELECT * FROM attendance WHERE student_id = ? AND date = ?',
          [user.id, currentDate]
        );

        if (existingRecord.length === 0) {
          // If no record exists, create a blank attendance record
          await db.execute(
            'INSERT INTO attendance (student_id, date, checkin_morning, checkout_morning, checkin_afternoon, checkout_afternoon, status_morning, status_afternoon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user.id, currentDate, null, null, null, null, null, null]
          );
        }
      });

      // Wait for all promises to complete
      await Promise.all(promises);

      res.status(200).json({ message: 'Attendance records checked and created if necessary' });
    } catch (error) {
      console.error('Error creating attendance records:', error);
      res.status(500).json({ message: 'Error creating attendance records' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
