"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ApexOptions } from "apexcharts";

// dynamic import to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
type chartComponentProps = {
  type: ApexOptions;
  options: Object;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  width?: string | number;
  height?: string | number;
  option?: Object;
};

export default function ChartComponent(config: chartComponentProps) {
  // Define the chart options and series state
  const [chartOptions, setChartOptions] = useState(config.options);
  const [chartSeries, setChartSeries] = useState(config.series);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={350}
    />
  );
}
