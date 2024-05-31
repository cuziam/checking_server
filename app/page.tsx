import Image from "next/image";
import { Window } from "@/components/Window";
import { WebsiteStatusTable } from "@/components/WebsiteStatusTable";

export default async function Home() {
  const appName = "My App";
  const logo = "https://example.com/logo.png";
  const serverStatus = "Running";
  const latency = "10ms";
  const updatedTime = "2023-05-29 12:34:56";

  return (
    <>
      <Window
        appName={appName}
        logo={logo}
        serverStatus={serverStatus}
        latency={latency}
        updatedTime={updatedTime}
      />
      <WebsiteStatusTable />
    </>
  );
}
