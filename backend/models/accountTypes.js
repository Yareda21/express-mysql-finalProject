import pool from '../db.js';

const TABLE_NAME = 'account_types';

export async function getAllAccountTypes() {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getAccountTypeById(id) {
  const [row] = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE type_id = ?`, [id]);
  return row;
}

export async function createAccountType(type_name, description, minimum_balance, interest_rate) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE_NAME} (type_name, description, minimum_balance, interest_rate) VALUES (?, ?, ?, ?)`,
    [type_name, description, minimum_balance, interest_rate]
  );
  return result.insertId;
}

export async function updateAccountType(id, column, value) {
  const [result] = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = ? WHERE type_id = ?`, [value, id]);
  return result;
}

export async function deleteAccountType(id) {
  const [result] = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE type_id = ?`, [id]);
  return result;
}