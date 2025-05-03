import db from '@/lib/db'; // Import db connection

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const result = await db.query('DELETE FROM organizations WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete organization' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
