import { ServerCurrentStateRecord } from "@/lib/types/ClientInterface";
export default function ServerStatusTableRow(record: ServerCurrentStateRecord) {
  //status에 따라 색깔을 다르게 표시
  let statusColor: string;
  switch (record.status) {
    case "good":
      statusColor = "bg-green-100 text-green-800";
      break;
    case "warning":
      statusColor = "bg-yellow-100 text-yellow-800";
      break;
    case "bad":
      statusColor = "bg-red-100 text-red-800";
      break;
    default:
      statusColor = "bg-gray-100 text-gray-800";
  }

  return (
    <tr className="h-16 border-y-2 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <td className="px-6 py-3 font-extrabold">{record.website_name}</td>
      <td className="px-6 py-3 font-extrabold">{record.updated_time}</td>
      <td className={`px-6 py-3 font-extrabold ${statusColor}`}>
        {record.status}
      </td>
      <td className="px-6 py-3 font-extrabold">{record.http_status}</td>
      <td className="px-6 py-3 font-extrabold">{record.latency}ms</td>
      <td className="px-6 py-3 font-extrabold">{record.last_error_time}</td>
      <td className="px-6 py-3 font-extrabold">{record.last_recovery_time}</td>
    </tr>
  );
}
