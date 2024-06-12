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
    <>
      <div className="relative border-2 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
          <thead className="h-16 text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 font-extrabold">
                웹사이트 이름
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                업데이트 시각
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                응답 상태
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                HTTP 코드
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                지연시간
              </th>
              <th scope="col" className="px-6 py-3 font-extrabold">
                마지막 에러 시각
              </th>
              <th scope="col" className="px-6 py-3">
                마지막 에러 회복 시각
              </th>
            </tr>
          </thead>
          <tbody>
            {serverCurrentState.map((record, index) => {
              let rowColor;
              if (record.status === "good") {
                rowColor = "bg-green-100 dark:bg-green-900";
              } else if (record.status === "bad") {
                rowColor = "bg-red-200 dark:bg-red-900";
              } else {
                rowColor = "bg-yellow-100 dark:bg-yellow-900";
              }
              return (
                <tr key={index} className={rowColor}>
                  <td className="px-6 py-4">{record.website_name}</td>
                  <td className="px-6 py-4">{record.updated_time}</td>
                  <td className="px-6 py-4">{record.status}</td>
                  <td className="px-6 py-4">{record.http_status}</td>
                  <td className="px-6 py-4">{record.latency}ms</td>
                  <td className="px-6 py-4">{record.last_error_time}</td>
                  <td className="px-6 py-4">{record.last_recovery_time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
