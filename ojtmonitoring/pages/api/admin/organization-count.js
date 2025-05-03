import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    const [[result]] = await db.query("SELECT COUNT(*) AS count FROM organizations");
    res.status(200).json({ organizationCount: result.count });
  } catch (error) {
    console.error('Error fetching organization count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
