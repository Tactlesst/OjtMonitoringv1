import db from '@/lib/db';

export default async function handler(req, res) {
  const { studentId } = req.query;
  console.log('Incoming request for attendance with studentId:', studentId);

  if (req.method === 'GET') {
    try {
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      console.log("Today's date:", today);

      // Fetch today's attendance for the student with updated column names
      const [attendance] = await db.execute(
        'SELECT checkin_morning, checkout_morning, status_morning, checkin_afternoon, checkout_afternoon, status_afternoon FROM attendance WHERE student_id = ? AND date = ?',
        [studentId, today]
      );

      console.log('Fetched attendance for today:', attendance);

      if (!attendance || attendance.length === 0) {
        console.log('No attendance found for studentId:', studentId);
        return res.status(404).json({ message: 'No attendance found for today' });
      }

      // Structure the data to return
      const attendanceData = {
        morning: {
          checkIn: attendance[0].checkin_morning,
          checkOut: attendance[0].checkout_morning,
          status: attendance[0].status_morning
        },
        afternoon: {
          checkIn: attendance[0].checkin_afternoon,
          checkOut: attendance[0].checkout_afternoon,
          status: attendance[0].status_afternoon
        }
      };

      res.status(200).json(attendanceData);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    console.log('Unsupported request method:', req.method);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
