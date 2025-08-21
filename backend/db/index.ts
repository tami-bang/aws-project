import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',       // 로컬 MySQL
  user: 'root',            // MySQL 유저
  password: 'password',    // 비밀번호
  database: 'deliverynow', // DB 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;