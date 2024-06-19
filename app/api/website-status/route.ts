import {
  fetchWebsiteCurrentState,
  fetchWebsiteStatusRecord,
} from "@/lib/db/db_query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // URL에서 query와 name 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const queryName = searchParams.get("name");

    // switch 문을 사용하여 조건 처리
    switch (true) {
      case !request.nextUrl.search: // query가 없는 경우
        const currentStateRows = await fetchWebsiteCurrentState();
        return NextResponse.json(currentStateRows);

      case queryName !== null: // query가 있고 그게 name을 갖고 있으면
        const statusRecordRows = await fetchWebsiteStatusRecord(queryName);
        return NextResponse.json(statusRecordRows);

      default: // 위 조건이 모두 해당하지 않는 경우
        return NextResponse.error();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
