"use client";
import ServerStatusTable from "@/components/ServerStatusTable";

export default function Page() {
  return (
    <>
      <header></header>
      <main className="mx-4 my-2">
        <ServerStatusTable />
      </main>
      <footer></footer>
    </>
  );
}
