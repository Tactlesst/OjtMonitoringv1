import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    let { date } = req.query;

    // Use today's date if none provided or format is invalid
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const today = new Date();
      date = today.toISOString().slice(0, 10); // Still needed to ensure a valid date for query
    }

    const query = `
      SELECT u.id as user_id, u.student_id, u.first_name, u.last_name,
             a.status_morning, a.status_afternoon,
             a.checkin_morning, a.checkout_morning,
             a.checkin_afternoon, a.checkout_afternoon, a.date
      FROM users u
      LEFT JOIN attendance a ON a.student_id = u.id AND a.date = ?
      ORDER BY u.first_name, u.last_name
    `;

    const [rows] = await db.query(query, [date]);

    res.status(200).json(rows); // Return raw data with no formatting
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
