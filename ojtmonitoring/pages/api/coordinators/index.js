import db from '@/lib/db';

export default async function handler(req, res) {
  try {
    // Query the coordinators from the database
    const [rows] = await db.execute('SELECT * FROM users WHERE role = "coordinator"');
    
    // Respond with the list of coordinators
    res.status(200).json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Error fetching coordinators' });
  }
}
