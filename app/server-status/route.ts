import { fetchWebsiteCurrentState } from "@/lib/db/db_query";
export async function GET(request: Request) {
  const rows = await fetchWebsiteCurrentState();
  return Response.json(rows);
}
