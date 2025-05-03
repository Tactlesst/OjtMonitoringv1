// pages/api/admin/disabled-users.js
import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    const disabledCountQuery = `SELECT COUNT(*) AS disabledCount FROM users WHERE disabled = 1`;
    const [disabledResult] = await query(disabledCountQuery);
    res.status(200).json({ disabledCount: disabledResult.disabledCount });
  } catch (error) {
    console.error('Error fetching disabled users count:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
