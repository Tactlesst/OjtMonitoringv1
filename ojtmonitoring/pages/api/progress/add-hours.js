import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { student_id, hours } = req.body;

  if (!student_id || typeof hours !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Check if progress record exists for this student
    const [rows] = await db.execute('SELECT * FROM progress WHERE student_id = ?', [student_id]);

    if (rows.length === 0) {
      // If no record, create one with hours_completed = hours
      await db.execute('INSERT INTO progress (student_id, hours_completed) VALUES (?, ?)', [student_id, hours]);
    } else {
      // If exists, update by adding hours
      await db.execute('UPDATE progress SET hours_completed = hours_completed + ? WHERE student_id = ?', [hours, student_id]);
    }

    res.status(200).json({ message: `Added ${hours} hours to student progress.` });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
