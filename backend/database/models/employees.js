import { dotenv } from "dotenv"
import { pool } from "../db"

dotenv.config()

const  TABLE_NAME = "employees"

async function getAllEmployees() {
    try {
        const query = "select * from ??"
        const [raws] = await pool.execute(query, TABLE_NAME)
        return raws;
    } catch (error) {
        console.log(error)
    }
}