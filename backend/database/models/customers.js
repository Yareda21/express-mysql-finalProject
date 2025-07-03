import { pool } from "../db.js";

const TABLE_NAME = "customers";

async function getAllCustomers() {
    const query = "SELECT * FROM ??";
    const [rows] = await pool.query(query, [TABLE_NAME]);
    return rows;
}

async function getCustomerById(customer_id) {
    const query = "SELECT * FROM ?? WHERE customer_id = ?";
    const [rows] = await pool.query(query, [TABLE_NAME, customer_id]);
    return rows[0] || null;
}

async function createCustomer({
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    state,
    zip_code,
    date_of_birth,
    ssn,
}) {
    const query = `INSERT INTO ?? (first_name, last_name, email, phone, address, city, state, zip_code, date_of_birth, ssn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        zip_code,
        date_of_birth,
        ssn,
    ]);
    return result.insertId;
}

async function updateCustomer(
    customer_id,
    {
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        zip_code,
        date_of_birth,
        ssn,
    }
) {
    const query = `UPDATE ?? SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip_code = ?, date_of_birth = ?, ssn = ? WHERE customer_id = ?`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        zip_code,
        date_of_birth,
        ssn,
        customer_id,
    ]);
    return result.affectedRows;
}

async function removeCustomer(customer_id) {
    const query = "DELETE FROM ?? WHERE customer_id = ?";
    const [result] = await pool.execute(query, [TABLE_NAME, customer_id]);
    return result.affectedRows;
}

export {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    removeCustomer,
};
