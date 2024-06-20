"use client";
import { useState, useMemo, ReactNode } from "react";

// TableProps 타입 정의
interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  type?: string;
}

// 재사용 가능한 Table 컴포넌트
export default function Table<T>({ data, columns, type }: TableProps<T>) {
  console.log("data:", data);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  // 정렬 상태 설정 함수
  const onSort = (key: keyof T) => {
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

  // 정렬된 데이터 생성
  const sortedItems = useMemo(() => {
    let sortableItems = [...data];
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
  }, [data, sortConfig]);

  return (
    <div className="relative w-full h-full max-h-[75vh] border-2  rounded-lg my-4 overflow-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
        <thead className="h-16 text-base text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                scope="col"
                className="px-6 py-3 font-extrabold cursor-pointer active:bg-gray-200"
                onClick={() => onSort(column.key)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="h-16 border-y-2 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className="px-6 py-4 font-extrabold"
                >
                  {item[column.key] as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
