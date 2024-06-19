"use client";
import { ServerStateRecord } from "@/lib/types/ClientInterface";
import Table from "@/components/Table";

//테이블 형태나 리스트 형태로 데이터를 보여주는 컴포넌트
export default function ServerStatusDetail({
  serverState,
}: {
  serverState: ServerStateRecord[];
}) {
  return (
    <>
      <Table
        data={serverState}
        columns={[
          { key: "updated_time", label: "업데이트 시간" },
          { key: "status", label: "상태" },
          { key: "http_status", label: "HTTP 상태" },
          { key: "latency", label: "지연시간" },
        ]}
      />
    </>
  );
}
