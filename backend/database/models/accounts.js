import { pool } from "../db.js";

const TABLE_NAME = "accounts";

async function getAllAccounts() {
    const query = `SELECT a.*, c.first_name, c.last_name, b.branch_name, t.type_name
                   FROM ?? a
                   JOIN customers c ON a.customer_id = c.customer_id
                   JOIN branches b ON a.branch_id = b.branch_id
                   JOIN account_types t ON a.type_id = t.type_id`;
    const [rows] = await pool.query(query, [TABLE_NAME]);
    return rows;
}

async function getAccountById(account_id) {
    const query = `SELECT a.*, c.first_name, c.last_name, b.branch_name, t.type_name
                   FROM ?? a
                   JOIN customers c ON a.customer_id = c.customer_id
                   JOIN branches b ON a.branch_id = b.branch_id
                   JOIN account_types t ON a.type_id = t.type_id
                   WHERE a.account_id = ?`;
    const [rows] = await pool.query(query, [TABLE_NAME, account_id]);
    return rows[0] || null;
}

async function createAccount({
    customer_id,
    branch_id,
    type_id,
    account_number,
    balance,
    status,
}) {
    const query = `INSERT INTO ?? (customer_id, branch_id, type_id, account_number, balance, status) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        customer_id,
        branch_id,
        type_id,
        account_number,
        balance,
        status,
    ]);
    return result.insertId;
}

async function updateAccount(account_id, { balance, status }) {
    const query = `UPDATE ?? SET balance = ?, status = ? WHERE account_id = ?`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        balance,
        status,
        account_id,
    ]);
    return result.affectedRows;
}

async function removeAccount(account_id) {
    const query = "DELETE FROM ?? WHERE account_id = ?";
    const [result] = await pool.execute(query, [TABLE_NAME, account_id]);
    return result.affectedRows;
}

export {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    removeAccount,
};
