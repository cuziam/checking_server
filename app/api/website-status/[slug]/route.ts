export const dynamic = "force-dynamic";
import { fetchWebsiteStatusRecord } from "@/lib/db/db_query";
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  try {
    const statusRecordRows = await fetchWebsiteStatusRecord(slug);
    return Response.json(statusRecordRows);
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
