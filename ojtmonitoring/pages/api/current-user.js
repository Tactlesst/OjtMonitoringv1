// pages/api/current-user.js

import { getSession } from 'next-auth'; // Or your session management library
import { db } from '../../lib/db'; // Assuming a database helper file

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (!session || !session.user.id) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const user = await db('users') // Replace with your actual DB query
    .select('id', 'first_name', 'last_name', 'role') // Adjust based on your DB schema
    .where('id', session.user.id)
    .first();

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
}
