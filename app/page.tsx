"use client";

import SearchBar from "@/components/SearchBar";
import ServerStatusDetail from "@/components/ServerStatusDetail";
import ServerStatusTable from "@/components/ServerStatusTable";

export default function Page() {
  return (
    <>
      <ServerStatusDetail />
      <SearchBar />
      <ServerStatusTable />
    </>
  );
}
