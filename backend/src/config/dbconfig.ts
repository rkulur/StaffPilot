import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.DATABASE_URL;

const sql = connectionString ? postgres(connectionString) : null;
export default sql;
