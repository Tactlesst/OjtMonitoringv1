import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then((connection) => {
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

export default db;
