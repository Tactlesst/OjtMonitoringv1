import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { year } = req.query;

  if (!year) {
    return res.status(400).json({ message: 'Missing year parameter' });
  }

  try {
    const query = `
      SELECT id, first_name, last_name, student_id
      FROM users
      WHERE role = 'student'
        AND YEAR(created_at) = ?
    `;
    const [rows] = await db.query(query, [year]);
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching students by year:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
