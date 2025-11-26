import express from 'express'
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    removeEmployee,
} from "../database/models/employees.js"

const TABLE_NAME = 'employees';

const router = express.Router()

export async function getAllEmployees() {
  const [rows] = await pool.query(`SELECT * FROM ${TABLE_NAME}`);
  return rows;
}

export async function getEmployeeById(id) {
  const [row] = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE employee_id = ?`, [id]);
  return row;
}

export async function createEmployee(branch_id, first_name, last_name, position, email, phone, hire_date, salary) {
  const [result] = await pool.query(
    `INSERT INTO ${TABLE_NAME} (branch_id, first_name, last_name, position, email, phone, hire_date, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [branch_id, first_name, last_name, position, email, phone, hire_date, salary]
  );
  return result.insertId;
}

export async function updateEmployee(id, column, value) {
  const [result] = await pool.query(`UPDATE ${TABLE_NAME} SET ${column} = ? WHERE employee_id = ?`, [value, id]);
  return result;
}

export async function deleteEmployee(id) {
  const [result] = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE employee_id = ?`, [id]);
  return result;
}