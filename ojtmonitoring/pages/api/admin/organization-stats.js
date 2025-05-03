// pages/api/admin/organization-stats.js
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    const orgStatsQuery = `
      SELECT o.name AS organization_name, COUNT(u.id) AS student_count
      FROM organizations o
      LEFT JOIN users u ON u.organization_id = o.id
      WHERE u.disabled = 0 AND u.role = 'student'
      GROUP BY o.name
    `;
    const orgStats = await query(orgStatsQuery);
    res.status(200).json(orgStats);
  } catch (error) {
    console.error('Error fetching organization stats:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
