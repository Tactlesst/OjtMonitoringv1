import db from '@/lib/db';

export async function getUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows.length > 0 ? rows[0] : null;
}