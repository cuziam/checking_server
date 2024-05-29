import mysql from "mysql2/promise";

export default class DatabaseService {
  private static instance: DatabaseService;
  private connection: mysql.Connection | null = null;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect(config: mysql.ConnectionOptions): Promise<void> {
    if (this.connection) {
      console.log("Already connected to the database.");
      return;
    }
    this.connection = await mysql.createConnection(config);
    console.log(`Connected to database: ${config.database}`);
  }

  public getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error("Database connection is not established.");
    }
    return this.connection;
  }

  public async close(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      console.log("Database connection closed.");
    }
  }

  // Example function to perform a query
  public async query(
    sql: string,
    values?: any[]
  ): Promise<mysql.RowDataPacket[]> {
    const [rows] = await this.getConnection().execute<mysql.RowDataPacket[]>(
      sql,
      values
    );
    return rows;
  }
}
