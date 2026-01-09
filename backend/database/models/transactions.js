import { pool } from "../db.js";

const TABLE_NAME = "transactions";

async function getAllTransactions() {
    const query = "SELECT * FROM ??";
    const [rows] = await pool.query(query, [TABLE_NAME]);
    return rows;
}

async function getTransactionById(transaction_id) {
    const query = "SELECT * FROM ?? WHERE transaction_id = ?";
    const [rows] = await pool.query(query, [TABLE_NAME, transaction_id]);
    return rows[0] || null;
}

async function createTransaction({
    account_id,
    transaction_type,
    amount,
    description,
}) {
    const query = `INSERT INTO ?? (account_id, transaction_type, amount, description) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        account_id,
        transaction_type,
        amount,
        description,
    ]);
    return result.insertId;
}

async function updateTransaction(
    transaction_id,
    { transaction_type, amount, description }
) {
    const query = `UPDATE ?? SET transaction_type = ?, amount = ?, description = ? WHERE transaction_id = ?`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        transaction_type,
        amount,
        description,
        transaction_id,
    ]);
    return result.affectedRows;
}

async function removeTransaction(transaction_id) {
    const query = "DELETE FROM ?? WHERE transaction_id = ?";
    const [result] = await pool.execute(query, [TABLE_NAME, transaction_id]);
    return result.affectedRows;
}

export {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    removeTransaction,
};
