// pages/api/admin/registration-trend.js
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    const trendQuery = `
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') AS month,
        COUNT(*) AS registrations
      FROM users
      WHERE role = 'student'
      GROUP BY month
      ORDER BY month DESC
    `;
    const trendData = await query(trendQuery);
    res.status(200).json(trendData);
  } catch (error) {
    console.error('Error fetching registration trend:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
