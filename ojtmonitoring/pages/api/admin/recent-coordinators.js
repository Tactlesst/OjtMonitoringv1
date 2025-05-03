// pages/api/admin/recent-coordinators.js
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    const recentCoordsQuery = `
      SELECT id, first_name, last_name, last_login
      FROM users
      WHERE role = 'coordinator' AND disabled = 0
      ORDER BY last_login DESC
      LIMIT 10
    `;
    const recentCoordinators = await query(recentCoordsQuery);
    res.status(200).json(recentCoordinators);
  } catch (error) {
    console.error('Error fetching recent coordinators:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
