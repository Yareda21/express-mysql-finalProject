import { pool } from "../db.js";

const TABLE_NAME = "branches";

async function getAllBranches() {
    const query = "select * from ??";
    const [raws] = await pool.query(query, TABLE_NAME);
    return raws;
}

async function getBranchById(branch_id) {
    const query = "select * from ?? where id = ?";

    const [raws] = await pool.query(query, [TABLE_NAME, branch_id]);
    return raws[0];
}

async function createBranch({
    branch_name,
    address,
    city,
    state,
    zip_code,
    phone,
}) {
    const query =
        "insert into ?? (branch_name, address, city, state, zip_code, phone) VALUES (?, ?, ?, ?, ?, ?) ";
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        branch_name,
        address,
        city,
        state,
        zip_code,
        phone,
    ]);
    return result.insertId;
}

async function updateBranch(
    branch_id,
    { branch_name, address, city, state, zip_code, phone }
) {
    const query = `UPDATE ?? SET
       branch_name = ?, address = ?, city = ?, state = ?, zip_code = ?, phone = ?
     WHERE branch_id = ?`;
    const [result] = await pool.execute(query, [
        TABLE_NAME,
        branch_name,
        address,
        city,
        state,
        zip_code,
        phone,
        branch_id,
    ]);
    return result.affectedRows;
}

async function removeBranch(branch_id) {
    const query = "DELETE FROM branches WHERE branch_id = ?";
    const [result] = await pool.execute(query, [branch_id]);
    return result.affectedRows;
}

export {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    removeBranch,
};
