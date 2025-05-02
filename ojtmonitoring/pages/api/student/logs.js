import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, student_id } = req.query;

    if (!userId || !student_id) {
      return res.status(400).json({ message: 'Missing userId or student_id' });
    }

    // 1. Get recent login logs
    const [loginLogs] = await pool.query(
      `SELECT login_time AS timestamp 
       FROM login_logs 
       WHERE user_id = ? 
       ORDER BY login_time DESC 
       LIMIT 5`,
      [userId]
    );

    const formattedLoginLogs = loginLogs.map((log, index) => ({
      id: `login-${index}`,
      timestamp: log.timestamp,
      action: 'Logged in',
      details: 'User successfully logged in.',
    }));

    // 2. Get recent attendance logs
    const [attendanceLogs] = await pool.query(
      `SELECT 
        date, 
        checkin_morning, checkout_morning, status_morning, 
        checkin_afternoon, checkout_afternoon, status_afternoon 
       FROM attendance 
       WHERE student_id = ? 
       ORDER BY date DESC 
       LIMIT 5`,
      [student_id]
    );

    const formattedAttendanceLogs = attendanceLogs.flatMap((record, index) => {
      const logs = [];

      if (record.checkin_morning) {
        logs.push({
          id: `att-checkin-m-${index}`,
          timestamp: `${record.date} ${record.checkin_morning}`,
          action: 'Morning Check-in',
          details: `Status: ${record.status_morning}`,
        });
      }

      if (record.checkout_morning) {
        logs.push({
          id: `att-checkout-m-${index}`,
          timestamp: `${record.date} ${record.checkout_morning}`,
          action: 'Morning Check-out',
          details: `Status: ${record.status_morning}`,
        });
      }

      if (record.checkin_afternoon) {
        logs.push({
          id: `att-checkin-a-${index}`,
          timestamp: `${record.date} ${record.checkin_afternoon}`,
          action: 'Afternoon Check-in',
          details: `Status: ${record.status_afternoon}`,
        });
      }

      if (record.checkout_afternoon) {
        logs.push({
          id: `att-checkout-a-${index}`,
          timestamp: `${record.date} ${record.checkout_afternoon}`,
          action: 'Afternoon Check-out',
          details: `Status: ${record.status_afternoon}`,
        });
      }

      return logs;
    });

    // 3. Get recent activity logs (general actions)
    const [activityLogs] = await pool.query(
      `SELECT timestamp, action, details FROM activity_logs WHERE user_id = ? ORDER BY timestamp DESC LIMIT 5`,
      [userId]
    );

    const formattedActivityLogs = activityLogs.map((log) => ({
      id: `activity-${log.id}`,
      timestamp: log.timestamp,
      action: log.action,
      details: log.details,
    }));

    // 4. Combine and sort all logs
    const allLogs = [
      ...formattedLoginLogs,
      ...formattedAttendanceLogs,
      ...formattedActivityLogs,
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json(allLogs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
