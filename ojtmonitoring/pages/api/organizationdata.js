// pages/api/organizationdata.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all organizations or filter by search term
    const { search = '' } = req.query;

    try {
      const query = search
        ? `SELECT * FROM organizations WHERE name LIKE ? ORDER BY created_at DESC`
        : `SELECT * FROM organizations ORDER BY created_at DESC`;

      const [organizations] = await db.execute(query, [`%${search}%`]);

      res.status(200).json(organizations);
    } catch (err) {
      console.error('Error fetching organizations:', err);
      res.status(500).json({ message: 'Failed to fetch organizations' });
    }
  } else if (req.method === 'POST') {
    // Add a new organization
    const { name, address, contact_email, contact_phone } = req.body;

    try {
      const query = `INSERT INTO organizations (name, address, contact_email, contact_phone) VALUES (?, ?, ?, ?)`;
      const [result] = await db.execute(query, [
        name,
        address,
        contact_email,
        contact_phone,
      ]);

      res.status(201).json({ message: 'Organization added successfully', id: result.insertId });
    } catch (err) {
      console.error('Error adding organization:', err);
      res.status(500).json({ message: 'Failed to add organization' });
    }
  } else if (req.method === 'PUT') {
    // Update an existing organization
    const { id, name, address, contact_email, contact_phone } = req.body;

    try {
      const query = `UPDATE organizations SET name = ?, address = ?, contact_email = ?, contact_phone = ? WHERE id = ?`;
      await db.execute(query, [
        name,
        address,
        contact_email,
        contact_phone,
        id,
      ]);

      res.status(200).json({ message: 'Organization updated successfully' });
    } catch (err) {
      console.error('Error updating organization:', err);
      res.status(500).json({ message: 'Failed to update organization' });
    }
  } else {
    // Method not allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
