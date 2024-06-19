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

// //serverstatus는 serverstatusrecord의 배열이다.
// export type ServerStatus = ServerStatusRecord[];
