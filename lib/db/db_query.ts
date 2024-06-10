"use server";
// MySQL 연결 풀 설정
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.test_host,
  user: process.env.test_user,
  password: process.env.test_user_password,
  database: process.env.test_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const fetchWebsiteCurrentState = async () => {
  const [rows] = await pool.execute("SELECT * FROM website_current_state");
  return rows;
};
