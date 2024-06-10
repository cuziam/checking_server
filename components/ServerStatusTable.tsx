"use client";
import { useState, useEffect } from "react";
import { ServerCurrentStateRecord } from "@/lib/types/ClientInterface";
import formatKoreanDateTime from "@/lib/utils/formatKoreanDateTime";

export default function ServerStatusTable() {
  const [serverCurrentState, setServerCurrentState] = useState<
    ServerCurrentStateRecord[]
  >([]);

  useEffect(() => {
    async function fetchServerStatus() {
      try {
        const response = await fetch("http://localhost:3000/server-status");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        //data 파싱
        data.forEach((record: ServerCurrentStateRecord) => {
          record.updated_time = formatKoreanDateTime(record.updated_time);
          record.last_error_time = formatKoreanDateTime(record.last_error_time);
          record.last_recovery_time = formatKoreanDateTime(
            record.last_recovery_time
          );
        });
        //data를 serverCurrentState에 저장
        setServerCurrentState(data);
      } catch (error) {
        console.error("Fetching error: ", error);
      }
    }

    if (serverCurrentState.length === 0) {
      fetchServerStatus();
    }
  }, [serverCurrentState]);

  return (
    <table className="table-auto p-4 border-8">
      <thead>
        <tr>
          <th className="px-4 py-2">웹사이트 이름</th>
          <th className="px-4 py-2">업데이트 시각</th>
          <th className="px-4 py-2">응답 상태</th>
          <th className="px-4 py-2">HTTP 코드</th>
          <th className="px-4 py-2">지연시간</th>
          <th className="px-4 py-2">마지막 에러 시각</th>
          <th className="px-4 py-2">마지막 에러 회복 시각</th>
        </tr>
      </thead>
      <tbody>
        {serverCurrentState.map((record, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{record.website_name}</td>
            <td className="border px-4 py-2">{record.updated_time}</td>
            <td className="border px-4 py-2">{record.status}</td>
            <td className="border px-4 py-2">{record.http_status}</td>
            <td className="border px-4 py-2">{record.latency}ms</td>
            <td className="border px-4 py-2">{record.last_error_time}</td>
            <td className="border px-4 py-2">{record.last_recovery_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
