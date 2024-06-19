"use client";
import { useState, useMemo } from "react";
import { ServerCurrentStateRecord } from "@/lib/types/ClientInterface";

import ServerStatusTableRow from "./ServerStatusTableRow";

export default function ServerStatusTable({
  serverCurrentState,
}: {
  serverCurrentState: ServerCurrentStateRecord[];
}) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const onSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...serverCurrentState];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [serverCurrentState, sortConfig]);

  return (
    <>
      <div className="relative w-full h-full max-h-[75vh] border-2 my-4 overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
          <thead className="h-16 text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("website_name")}
              >
                웹사이트 이름
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("updated_time")}
              >
                업데이트 시각
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("status")}
              >
                응답 상태
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("http_status")}
              >
                HTTP 코드
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("latency")}
              >
                지연시간
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("last_error_time")}
              >
                마지막 에러 시각
              </th>
              <th
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort("last_recovery_time")}
              >
                마지막 에러 회복 시각
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((record) => (
              <ServerStatusTableRow key={record.website_name} {...record} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
