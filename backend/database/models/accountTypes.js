import { pool } from "../db.js";

const TABLE_NAME = "account_types";

async function getAllAccountTypes() {
    const query = "SELECT * FROM ??";
    const [rows] = await pool.query(query, [TABLE_NAME]);
    return rows;
}

async function getAccountTypeById(type_id) {
    const query = "SELECT * FROM ?? WHERE type_id = ?";
    const [rows] = await pool.query(query, [TABLE_NAME, type_id]);
    return rows[0] || null;
}

async function createAccountType({ type_name, description, minimum_balance, interest_rate }) {
    const query = `INSERT INTO ?? (type_name, description, minimum_balance, interest_rate) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        type_name,
        description,
        minimum_balance,
        interest_rate
    ]);
    return result.insertId;
}

async function updateAccountType(type_id, { type_name, description, minimum_balance, interest_rate }) {
    const query = `UPDATE ?? SET type_name = ?, description = ?, minimum_balance = ?, interest_rate = ? WHERE type_id = ?`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        type_name,
        description,
        minimum_balance,
        interest_rate,
        type_id
    ]);
    return result.affectedRows;
}

async function removeAccountType(type_id) {
    const query = "DELETE FROM ?? WHERE type_id = ?";
    const [result] = await pool.execute(query, [TABLE_NAME, type_id]);
    return result.affectedRows;
}

export {
    getAllAccountTypes,
    getAccountTypeById,
    createAccountType,
    updateAccountType,
    removeAccountType
};