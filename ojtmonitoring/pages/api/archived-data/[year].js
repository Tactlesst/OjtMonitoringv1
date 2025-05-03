import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all archives (no filtering by year)
      const [archives] = await db.execute(
        'SELECT id, title, category, year, dateArchived, archivedBy FROM archives'
      );

      if (archives.length === 0) {
        // If no archives found, return an empty array rather than a 404
        return res.status(200).json([]);
      }

      return res.status(200).json(archives);
    } catch (error) {
      console.error('Error fetching archives:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    const { studentName, title, category, year, archivedBy } = req.body;

    try {
      // Archive the student data
      const result = await db.execute(
        'INSERT INTO archives (title, category, year, dateArchived, archivedBy) VALUES (?, ?, ?, NOW(), ?)',
        [title, category, year, archivedBy]
      );

      return res.status(200).json({ message: 'Archive successful', id: result.insertId });
    } catch (error) {
      console.error('Error archiving data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
