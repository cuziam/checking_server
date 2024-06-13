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

type common_record = {
  updated_time: string;
  status: "good" | "warning" | "bad";
  http_status: number;
  latency: number;
};
type error_record = string[];
type recovery_record = string[];

export interface ServerStatusDetail {
  website_name: string;
  common_record: common_record;
  error_record: error_record;
  recovery_record: recovery_record;
  last_error_time: string;
  last_recovery_time: string;
}

// //serverstatus는 serverstatusrecord의 배열이다.
// export type ServerStatus = ServerStatusRecord[];
