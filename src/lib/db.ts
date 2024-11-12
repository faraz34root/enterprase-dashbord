import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '185.4.65.66',
  user: 'Faraz34_admin',
  password: 'G4rfdssg34te',
  database: 'phpmyadmin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getAllEmployees() {
  try {
    const [rows] = await pool.execute('SELECT id, username as name FROM users');
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch employees from database');
  }
}

export async function getEmployeeAttendance(startDate: string, endDate: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM attendance WHERE date BETWEEN ? AND ?',
      [startDate, endDate]
    );
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch attendance data');
  }
}