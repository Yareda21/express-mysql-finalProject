import pool from '../backend/database.js'

const TABLE_NAME = "accounts";

async function getAllAccount(){
    try{
        const [row] = await pool.query(`SELECT * FROM ${TABLE_NAME}`)
        console.log(row);
        return row;
    }catch(err){
        console.error("Error in /adcity:", err);
       
    }}

async function getByIdAccounts(id){
    try{        
        const [result] = await pool.query(`SELECT * FROM ${TABLE_NAME} WHERE   account_id = ?`,[id])
        console.log(result)
        return result
    }
    catch(err){
        console.error("Error in /adcity:", err);
    }
}

async function createAccount(customer_id, branch_id, type_id, account_number, balance, status, opened){
    try{
          const [result] = await pool.query(
            `INSERT INTO ${TABLE_NAME}(customer_id, branch_id, type_id, account_number, balance, status, openedsd)
            VALUES(?,?,?,?,?,?,?)`,
            [
                customer_id, 
                branch_id, 
                type_id, 
                account_number, 
                balance, 
                status, 
                openedsd
            ]
        )
          return result.insertId;
    }
     catch(err){
        console.error("Error in /adcity:", err);
    }
}


async function updateaccount(id, column, value){
    try{
        const query = `UPDATE ${TABLE_NAME} SET ${column} = ? WHERE account_id = ?`;
        const [result] = await pool.query(query, [value, id]);
        return result
    }
    catch(err){
        console.error("Error in /adcity:", err);
    }
}

async function deleteaccount(id){
    try{
        const result = await pool.query(`DELETE FROM ${TABLE_NAME} WHERE account_id = ?`,[id])
    }catch(err){
        console.error("Error in /adcity:", err);
    }
}

export {getAllAccount, getByIdAccounts, createAccount, updateaccount, deleteaccount}