import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    const [[students]] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role = 'student' AND disabled = 0");
    const [[coordinators]] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role = 'coordinator' AND disabled = 0");

    res.status(200).json({
      studentCount: students.count,
      coordinatorCount: coordinators.count,
    });
  } catch (error) {
    console.error('Error fetching user counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
