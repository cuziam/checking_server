import { DateTimeFormatOptions } from "@/lib/types/ClientInterface";
export default function formatKoreanDateTime(isoString: string) {
  if (!isoString) return "";
  const date = new Date(isoString); // ISO 문자열을 Date 객체로 변환
  const koreanTime = new Date(date.getTime()); // UTC+9로 조정

  // 한국식 날짜 형식으로 문자열을 만듭니다.
  // 예: 2024년 6월 10일 오전 3시 17분 48초
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return koreanTime.toLocaleDateString("ko-KR", options);
}
