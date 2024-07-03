export const dynamic = "force-dynamic";
import { fetchWebsiteCurrentState } from "@/lib/db/db_query";
export async function GET(request: Request) {
  try {
    const statusRecordRows = await fetchWebsiteCurrentState();
    return Response.json(statusRecordRows);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
