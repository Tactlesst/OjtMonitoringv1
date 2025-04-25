// pages/api/student/[id].js

import db from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  console.log('Incoming request for student with ID:', id);

  if (req.method === 'GET') {
    try {
      // Fetch student profile
      const [user] = await db.execute(
        'SELECT first_name, last_name, email, student_id FROM users WHERE id = ? AND role = "student"',
        [id]
      );

      if (!user.length) {
        console.log('User not found with ID:', id);
        return res.status(404).json({ message: 'User not found' });
      }

      const student_id = user[0].student_id;
      console.log('Fetched student_id:', student_id);

      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      console.log("Today's date:", today);

      // Fetch today's attendance using student_id (varchar)
      const [attendance] = await db.execute(
        'SELECT checkin_morning, checkout_morning, status_morning, checkin_afternoon, checkout_afternoon, status_afternoon FROM attendance WHERE student_id = ? AND date = ?',
        [student_id, today]
      );

      console.log('Fetched attendance for today:', attendance);

      // Fetch total hours completed
      const [progress] = await db.execute(
        'SELECT SUM(hours_completed) AS total_hours FROM progress WHERE student_id = ?',
        [student_id]
      );

      console.log('Fetched progress:', progress);

      // Compile student data to return
      const studentData = {
        name: `${user[0].first_name} ${user[0].last_name}`,
        studentId: student_id,  // Using student_id here
        email: user[0].email,
        attendance: {
          morning: {
            checkIn: attendance[0]?.checkin_morning || null,
            checkOut: attendance[0]?.checkout_morning || null,
            status: attendance[0]?.status_morning || 'N/A'
          },
          afternoon: {
            checkIn: attendance[0]?.checkin_afternoon || null,
            checkOut: attendance[0]?.checkout_afternoon || null,
            status: attendance[0]?.status_afternoon || 'N/A'
          }
        },
        totalHours: progress[0]?.total_hours || 0,
      };

      console.log('Final student data response:', studentData);

      res.status(200).json(studentData);
    } catch (error) {
      console.error('Error fetching student data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    console.log('Unsupported request method:', req.method);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
