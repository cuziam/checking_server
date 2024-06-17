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

export const fetchWebsiteNames = async () => {
  const [rows] = await pool.execute("SELECT website_name FROM website");
  return rows;
};

export const fetchWebsiteStatusRecord = async (websiteName: string) => {
  //24시간 이내의 데이터만 조회
  // 24시간 이내의 데이터만 조회
  const [rows] = await pool.execute(
    `SELECT website_name, website_url, updated_time, status, http_status, latency 
   FROM website_status_record AS record
   JOIN website ON record.website_id = website.website_id
   WHERE website_name = ? 
     AND updated_time >= DATE_SUB(NOW(), INTERVAL 24 HOUR)`,
    [websiteName]
  );

  return rows;
};
