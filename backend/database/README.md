# 📋 Database & CRUD Functions Guide

In this step, you will create the **data-access layer** that connects to MySQL and implements all CRUD operations for each resource. You will:

1. Set up your connection pool in `db.js`.
2. Create a `models/` folder containing one file per table, each exporting the required CRUD functions.
3. Use these functions in your route handlers (next step).

---

## 1. `db.js`

-   **Location:** `/backend/db.js`
-   **Task:**
    1. Import `mysql2/promise` and `dotenv`.
    2. Call `dotenv.config()` at top.
    3. Create a pool:
        ```js
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            // (optional) adjust connectionLimit, waitForConnections, etc.
        });
        ```
    4. Export the pool object:
        ```js
        module.exports = pool;
        ```

---

## 2. `models/` Folder

Create a folder `/backend/models/` and within it, one file for each resource:

-   `branches.js`
-   `employees.js`
-   `customers.js`
-   `accountTypes.js`
-   `accounts.js`
-   `transactions.js`

Each file must:

1. **Import** the pool:
    ```js
    const pool = require("../db");
    ```

## Export these async functions:

### getAll()

// returns array of all rows
async function getAll() { /_ SELECT _ FROM ... \*/ }

### getById(id)

// returns single row or null
async function getById(id) { /_ SELECT _ FROM ... WHERE id = ? \*/ }

### create(data)

// inserts a new record and returns insertId
async function create(data) { /_ INSERT INTO ... _/ }

### update(id, data)

// updates record and returns affectedRows
async function update(id, data) { /_ UPDATE ... WHERE id = ? _/ }

## remove(id)

// deletes record (or marks inactive) and returns affectedRows
async function remove(id) { /_ DELETE FROM ... WHERE id = ? _/ }
