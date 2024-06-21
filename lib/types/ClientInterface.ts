export interface ServerCurrentStateRecord {
  website_name: string;
  updated_time: string;
  status: "good" | "warning" | "bad";
  http_status: number;
  latency: number;
  last_error_time: string;
  last_recovery_time: string;
  [key: string]: any;
}

export type ServerStateRecord = {
  website_name: string;
  website_url: string;
  updated_time: string;
  status: "good" | "warning" | "bad";
  http_status: number;
  latency: number;
  [key: string]: any;
};

export type DateTimeFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  hour12?: boolean;
};
// //serverstatus는 serverstatusrecord의 배열이다.
// export type ServerStatus = ServerStatusRecord[];
