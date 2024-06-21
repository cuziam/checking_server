import {
  fetchWebsiteCurrentState,
  fetchWebsiteStatusRecord,
} from "@/lib/db/db_query";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const queryName = searchParams.get("name");

    if (queryName === null) {
      const currentStateRows = await fetchWebsiteCurrentState();
      return Response.json(currentStateRows);
    } else {
      const statusRecordRows = await fetchWebsiteStatusRecord(queryName);
      return Response.json(statusRecordRows);
    }
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
