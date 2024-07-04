import { DateTimeFormatOptions } from "@/lib/types/ClientInterface"; // 필요시 사용
export default function formatKoreanDateTime(dateString: string) {
  if (!dateString) return "";

  // ISO 형식이 아닌 날짜 문자열을 Date 객체로 변환하기 위해 T를 추가합니다.
  const isoString = dateString.replace(" ", "T");
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    // 날짜 변환이 실패한 경우 빈 문자열을 반환합니다.
    return "";
  }

  // 한국식 날짜 형식으로 문자열을 만듭니다.
  // 예: 2024년 7월 3일 오후 4시 51분 31초
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Seoul", // 한국 시간대를 명시적으로 지정
  };

  return new Intl.DateTimeFormat("ko-KR", options).format(date);
}
