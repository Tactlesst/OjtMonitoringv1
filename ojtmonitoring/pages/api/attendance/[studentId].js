import db from '@/lib/db';

export default async function handler(req, res) {
  const { studentId, date } = req.query;
  console.log('Incoming request for attendance with studentId:', studentId, 'and date:', date);

  if (req.method === 'GET') {
    try {
      // Get the date to query (use query parameter or default to today's date)
      const queryDate = date || new Date().toISOString().split('T')[0];
      console.log("Query date:", queryDate);

      // Fetch attendance for the student on the specified date
      const [attendance] = await db.execute(
        'SELECT checkin_morning, checkout_morning, status_morning, checkin_afternoon, checkout_afternoon, status_afternoon FROM attendance WHERE student_id = ? AND date = ?',
        [studentId, queryDate]
      );

      console.log('Fetched attendance for date:', queryDate, attendance);

      if (!attendance || attendance.length === 0) {
        console.log('No attendance found for studentId:', studentId, 'on date:', queryDate);
        return res.status(404).json({ message: 'No attendance found for the specified date' });
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
