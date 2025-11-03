import { Pool } from 'pg'
import dotenv from 'dotenv'
// import { parse } from 'path'

dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),

})

export const query = (text: string, params?: any[]) => pool.query(text, params)

export const testDBConection = async () => {
    try {
        const client = await pool.connect()
        console.log('Database connected successfully')
        client.release()
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1);
    }
}