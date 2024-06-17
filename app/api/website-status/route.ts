import { fetchWebsiteCurrentState } from "@/lib/db/db_query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const rows = await fetchWebsiteCurrentState();
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
