import DatabaseService from "@/lib/db/db_class";

const databaseService = DatabaseService.getInstance();
const dbConnectionConfig = {
  host: process.env.test_host,
  user: process.env.test_user,
  password: process.env.test_user_password,
  database: process.env.test_database,
};
async function connectToDatabase() {
  try {
    console.log(dbConnectionConfig);
    await databaseService.connect(dbConnectionConfig);
  } catch (e) {
    console.error("Error connecting to the database: ", e);
    if (databaseService) {
      await databaseService.close();
    }
    throw e; // Re-throw the error to handle it in the API route
  }
}

//db연결이 성공하면 db를 반환
export async function getDatabaseService() {
  try {
    await connectToDatabase();
  } catch (e) {
    console.error("Can not get the databaseService: ", e);
  } finally {
    return databaseService;
  }
}

export default getDatabaseService;
