import mysql from "mysql2/promise";

const fetchWebsiteCurrentStateRecord = async () => {
  "use server";
  const connection = await mysql.createConnection({
    host: process.env.test_host,
    user: process.env.test_user,
    password: process.env.test_user_password,
    database: process.env.test_database,
  });

  const [rows] = await connection.execute(
    "SELECT * FROM website_current_state"
  );
  return rows;
};

export const WebsiteStatusTable = async () => {
  const websiteCurrentStatus = await fetchWebsiteCurrentStateRecord();

  return (
    <>
      <h1>Website State Table</h1>
      <table>
        <thead>
          <tr>
            <th>Website Name</th>
            <th>Status</th>
            <th>HTTP CODE</th>
            <th>Latency</th>
          </tr>
        </thead>
        <tbody>
          {(websiteCurrentStatus as Array<any>).map((website, idx) => (
            <tr key={idx}>
              <td>{website.website_name}</td>
              <td>{website.status}</td>
              <td>{website.http_status}</td>
              <td>{website.latency}ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WebsiteStatusTable;
