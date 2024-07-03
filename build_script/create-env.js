const fs = require("fs");
const path = require("path");

//.env.production가 사용할 환경변수 목록
const envVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_DATABASE", "DB_PORT"];

const envContent = envVars
  .map((key) => `${key}=${process.env[key]}`)
  .join("\n");

fs.writeFileSync(path.join(__dirname, "..", ".env.production"), envContent);

console.log(".env.production file has been created/updated");
