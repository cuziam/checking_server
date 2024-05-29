import React from "react";

export function Window({ appName, logo, serverStatus, latency, updatedTime }) {
  return (
    <div>
      <h2>{appName}</h2>
      <div>
        <img src={logo} alt="Logo" />
        <p>Server Status: {serverStatus}</p>
        <p>Latency: {latency}</p>
        <p>Updated Time: {updatedTime}</p>
      </div>
      <ServerCurrentStatusTable />
    </div>
  );
}

function ServerCurrentStatusTable() {
  // 서버 현재 상태 데이터를 가져와서 테이블로 렌더링합니다.
  const data = [
    { name: "Server 1", status: "Running" },
    { name: "Server 2", status: "Stopped" },
    // 더 많은 서버 상태 데이터...
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Window;
