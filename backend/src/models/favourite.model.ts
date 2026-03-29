import { pool } from "../config/db";

// Add
export const addFavouriteToDB = async (userId: string | number, propertyId: string | number) => {
    const existing = await pool.query(
        "SELECT * FROM favourites WHERE user_id = $1 AND property_id = $2",
        [userId, propertyId]
    );

    if (existing.rows.length > 0) return null;

    const result = await pool.query(
        "INSERT INTO favourites (user_id, property_id) VALUES ($1, $2) RETURNING *",
        [userId, propertyId]
    );

    return result.rows[0];
};

// FIX: Get favourites WITH property details using a JOIN
export const getUserFavouritesFromDB = async (userId: string | number) => {
    const result = await pool.query(
        `SELECT p.* 
         FROM properties p
         JOIN favourites f ON p.id = f.property_id
         WHERE f.user_id = $1`,
        [userId]
    );
    return result.rows;
};

// Remove 
export const removeFavouriteFromDB = async (userId: string | number, propertyId: string | number) => {
    const result = await pool.query(
        "DELETE FROM favourites WHERE user_id = $1 AND property_id = $2 RETURNING *",
        [userId, propertyId]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
};