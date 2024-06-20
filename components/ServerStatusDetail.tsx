"use client";
import { ServerStateRecord } from "@/lib/types/ClientInterface";
import dynamic from "next/dynamic";
import Table from "@/components/Table";
//테이블 형태나 차트 형태로 데이터를 보여주는 컴포넌트

// dynamic import to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ServerStatusDetail({
  serverState,
}: {
  serverState: ServerStateRecord[];
}) {
  const getGradientColors = (status: "good" | "warning" | "bad") => {
    return status === "bad" ? "#FF6B69" : "#0E9F6E";
  };
  const chartColors = serverState.map((record) =>
    getGradientColors(record.status)
  );

  return (
    <>
      {/* 웹사이트명 */}
      {serverState.length > 0 && (
        <h2 className="text-center font-extrabold text-2xl m-4">
          {serverState[0].website_name} 접속 상태 기록
        </h2>
      )}
      {/* 차트 */}
      <div className="border-2 rounded-xl shadow-md sm:rounded-lg">
        <Chart
          options={{
            chart: {
              id: "server-status-chart",
              type: "line",
              height: 350,
              toolbar: {
                show: true,
              },
              dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
            },
            xaxis: {
              categories: serverState.map((record) => {
                // 업데이트 시간을 오전|오후 hh:mm:ss 형태로 변환
                const date = record.updated_time.split("일 ")[1];
                return date;
              }),
            },
            markers: {
              size: 5,
              colors: chartColors,
              strokeColors: chartColors,
              strokeWidth: 2,
              hover: {
                size: 7,
              },
            },
            tooltip: {
              enabled: true,
              custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                return `<div style="padding:10px;">HTTP Status: ${serverState[dataPointIndex].http_status}<br>
              Status: ${serverState[dataPointIndex].status}<br>
              Latency: ${serverState[dataPointIndex].latency}ms<br>
              </div>`;
              },
            },
            stroke: {
              curve: "smooth",
              width: 3,
              colors: ["#0E9F6E"],
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                gradientToColors: chartColors,
                shadeIntensity: 1,
                type: "vertical",
                opacityFrom: 0.7,
                opacityTo: 0.7,
                stops: serverState.map(
                  (_, index) => index * (100 / (serverState.length - 1))
                ),
              },
            },
            grid: {
              borderColor: "#e7e7e7",
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.3,
              },
            },
            yaxis: {
              title: {
                text: "Latency (ms)",
              },
            },
          }}
          series={[
            {
              name: "지연시간",
              data: serverState.map((record) => record.latency),
            },
          ]}
          type="line"
          height={350}
        />
      </div>
      {/* 테이블 */}
      <div className="max-h-[60vh] overflow-auto">
        {" "}
        <Table
          data={serverState}
          columns={[
            { key: "updated_time", label: "업데이트 시간" },
            { key: "status", label: "상태" },
            { key: "http_status", label: "HTTP 상태" },
            { key: "latency", label: "지연시간" },
          ]}
        />
      </div>
    </>
  );
}
