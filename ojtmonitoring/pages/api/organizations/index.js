import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM organizations');
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch organizations' });
    }
  } else if (req.method === 'POST') {
    const { name, address, contact_email, contact_phone } = req.body;
    try {
      const [result] = await db.query(
        'INSERT INTO organizations (name, address, contact_email, contact_phone) VALUES (?, ?, ?, ?)',
        [name, address, contact_email, contact_phone]
      );
      res.status(201).json({ id: result.insertId, name, address, contact_email, contact_phone });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create organization' });
    }
  } else if (req.method === 'PUT') {
    const { id, name, address, contact_email, contact_phone } = req.body;
    try {
      await db.query(
        'UPDATE organizations SET name = ?, address = ?, contact_email = ?, contact_phone = ? WHERE id = ?',
        [name, address, contact_email, contact_phone, id]
      );
      res.status(200).json({ id, name, address, contact_email, contact_phone });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update organization' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
