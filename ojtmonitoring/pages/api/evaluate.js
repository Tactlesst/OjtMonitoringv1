import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { student_id, remarks, rating } = req.body;

  if (!student_id || !rating) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const query = `
      INSERT INTO student_evaluations (student_id, remarks, rating)
      VALUES (?, ?, ?)
    `;
    await db.query(query, [student_id, remarks, rating]);

    res.status(200).json({ message: 'Evaluation submitted' });
  } catch (error) {
    console.error('Error saving evaluation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
