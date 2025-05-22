// pages/api/attendance/create.js
import db from '@/lib/db';
import dayjs from 'dayjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const [users] = await db.execute('SELECT id FROM users WHERE disabled = 0');

    let attendanceInserted = 0;
    let attendanceSkipped = 0;
    let progressCreated = 0;

    const promises = users.map(async (user) => {
      // 1. Check and create attendance
      const [attendance] = await db.execute(
        'SELECT id FROM attendance WHERE student_id = ? AND date = ?',
        [user.id, currentDate]
      );

      if (!attendance || attendance.length === 0) {
        await db.execute(
          `INSERT INTO attendance 
          (student_id, date, checkin_morning, checkout_morning, checkin_afternoon, checkout_afternoon, status_morning, status_afternoon) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [user.id, currentDate, null, null, null, null, null, null]
        );
        attendanceInserted++;
      } else {
        attendanceSkipped++;
      }

      // 2. Check and create progress record
      const [progress] = await db.execute(
        'SELECT id FROM progress WHERE student_id = ?',
        [user.id]
      );

      if (!progress || progress.length === 0) {
        await db.execute(
          'INSERT INTO progress (student_id, hours_completed, task_completed) VALUES (?, ?, ?)',
          [user.id, 0.00, 0]
        );
        progressCreated++;
      }
    });

    await Promise.all(promises);

    res.status(200).json({
      message: 'Attendance and progress records handled.',
      attendance: {
        inserted: attendanceInserted,
        skipped: attendanceSkipped
      },
      progress: {
        created: progressCreated
      }
    });
  } catch (error) {
    console.error('Error initializing records:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
