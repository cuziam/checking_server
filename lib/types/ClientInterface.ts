export interface ServerCurrentStateRecord {
  website_name: string;
  updated_time: string;
  status: string;
  http_status: number;
  latency: number;
  last_error_time: string;
  last_recovery_time: string;
}

// //serverstatus는 serverstatusrecord의 배열이다.
// export type ServerStatus = ServerStatusRecord[];
