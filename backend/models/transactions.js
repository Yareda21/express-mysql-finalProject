
import pool from '../db.js';

const TABLE_NAME = 'transactions';

export async function getAllTransactions() {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getTransactionById(id) {
  const [row] = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE transaction_id = ?`, [id]);
  return row;
}

export async function createTransaction(account_id, transaction_type, amount, description, timestamps) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE_NAME} (account_id, transaction_type, amount, description, timestamps) VALUES (?, ?, ?, ?, ?)`,
    [account_id, transaction_type, amount, description, timestamps]
  );
  return result.insertId;
}

export async function updateTransaction(id, column, value) {
  const [result] = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = ? WHERE transaction_id = ?`, [value, id]);
  return result;
}

export async function deleteTransaction(id) {
  const [result] = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE transaction_id = ?`, [id]);
  return result;
}
