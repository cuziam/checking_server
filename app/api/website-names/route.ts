export const dynamic = "force-dynamic";
import { fetchWebsiteNames } from "@/lib/db/db_query";
export async function GET(request: Request) {
  try {
    const rows = await fetchWebsiteNames();
    return Response.json(rows);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
