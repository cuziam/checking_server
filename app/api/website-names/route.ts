"use server";
import { fetchWebsiteNames } from "@/lib/db/db_query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const rows = await fetchWebsiteNames();
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error;
  }
}
