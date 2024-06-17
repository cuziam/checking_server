"use server";
import { QueryResult } from "mysql2/promise";
import { fetchWebsiteStatusRecord } from "@/lib/db/db_query";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  // URL 파라미터에서 slug 추출
  const { searchParams, pathname } = new URL(request.url);

  // pathname에서 slug 추출
  const slug = pathname.split("/").pop(); // URL 경로의 마지막 부분을 추출

  // slug가 없을 경우 에러 처리
  if (!slug) {
    return NextResponse.json(
      { error: "Slug is required" },
      { status: 400 } // 400 Bad Request
    );
  }

  try {
    // 데이터베이스 쿼리를 수행하여 데이터 가져오기
    const rows: QueryResult = await fetchWebsiteStatusRecord(slug);

    // 데이터가 없는 경우 처리
    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json(
        { message: "No records found" },
        { status: 404 } // 404 Not Found
      );
    }

    // 데이터가 있으면 JSON으로 응답
    return NextResponse.json(rows, { status: 200 }); // 200 OK
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
