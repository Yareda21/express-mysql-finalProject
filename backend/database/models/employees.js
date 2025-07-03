import { pool } from "../db.js";

const TABLE_NAME = "employees";

async function getAllEmployees() {
    const query = "SELECT * FROM ??";
    const [rows] = await pool.query(query, [TABLE_NAME]);
    return rows;
}

async function getEmployeeById(employee_id) {
    const query = "SELECT * FROM ?? WHERE employee_id = ?";
    const [rows] = await pool.query(query, [TABLE_NAME, employee_id]);
    return rows[0] || null;
}

async function createEmployee({
    branch_id,
    first_name,
    last_name,
    position,
    email,
    phone,
    hire_date,
    salary,
}) {
    const query = `INSERT INTO ?? (branch_id, first_name, last_name, position, email, phone, hire_date, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        branch_id,
        first_name,
        last_name,
        position,
        email,
        phone,
        hire_date,
        salary,
    ]);
    return result.insertId;
}

async function updateEmployee(
    employee_id,
    {
        branch_id,
        first_name,
        last_name,
        position,
        email,
        phone,
        hire_date,
        salary,
    }
) {
    const query = `UPDATE ?? SET branch_id = ?, first_name = ?, last_name = ?, position = ?, email = ?, phone = ?, hire_date = ?, salary = ? WHERE employee_id = ?`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        branch_id,
        first_name,
        last_name,
        position,
        email,
        phone,
        hire_date,
        salary,
        employee_id,
    ]);
    return result.affectedRows;
}

async function removeEmployee(employee_id) {
    const query = "DELETE FROM ?? WHERE employee_id = ?";
    const [result] = await pool.execute(query, [TABLE_NAME, employee_id]);
    return result.affectedRows;
}

export {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    removeEmployee,
};
