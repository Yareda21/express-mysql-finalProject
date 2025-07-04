
import pool from '../db.js';

const TABLE_NAME = 'customers';

export async function getAllCustomers() {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getCustomerById(id) {
  const [row] = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE customer_id = ?`, [id]);
  return row;
}

export async function createCustomer(first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE_NAME} (first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, phone, address, city, state, zip_code, DOB, SSN]
  );
  return result.insertId;
}

export async function updateCustomer(id, column, value) {
  const [result] = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = ? WHERE customer_id = ?`, [value, id]);
  return result;
}

export async function deleteCustomer(id) {
  const [result] = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE customer_id = ?`, [id]);
  return result;
}