import { pool } from "../config/db";

export const getAllProperties = async () => {
    const result = await pool.query(
        "SELECT * FROM properties ORDER BY created_at DESC"
    );
    return result.rows;
};

export const getPropertyByIdFromDB = async (id: string) => {
    const result = await pool.query("SELECT * FROM properties WHERE id = $1", [id]);
    return result.rows[0];
};