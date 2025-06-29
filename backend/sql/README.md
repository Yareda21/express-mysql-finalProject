# 🏦 Bank Database Assignment

In this task, you’ll build out the MySQL schema, seed data, views, and a stored procedure for our banking app. Follow the steps below **in order**, and commit your work to your repo in a folder named `backend/sql/`.

---

## 1. Database Initialization

1. **Create** a database called `bank_db`.  
2. **Switch** to use `bank_db` for all subsequent commands.

---

## 2. Table Definitions

Create separate `schema.sql` file that defines the following tables with these columns and constraints:

- **branches**  
  - Primary key auto‑increment `branch_id`  
  - Name, address, city, state, zip code, phone, created timestamp  
- **employees**  
  - Primary key auto‑increment `employee_id`  
  - Foreign key to `branches(branch_id)`  
  - First + last name, position, email (unique), phone, hire date, salary  
- **customers**  
  - Primary key auto‑increment `customer_id`  
  - First + last name, email (unique), phone, address, city, state, zip code, DOB, SSN (unique), created timestamp  
- **account_types**  
  - Primary key auto‑increment `type_id`  
  - Type name, description, minimum balance, interest rate  
- **accounts**  
  - Primary key auto‑increment `account_id`  
  - Foreign keys to `customers`, `branches`, `account_types`  
  - Account number (unique), balance, status enum, opened timestamp  
- **transactions**  
  - Primary key auto‑increment `transaction_id`  
  - Foreign key to `accounts(account_id)`  
  - Transaction type enum, amount, description, timestamp  

> **Tip:** Use appropriate data types (e.g. `DECIMAL` for money, `ENUM` for fixed lists, `TIMESTAMP`/`DATE` for dates), and add indexes on columns you expect to query frequently (e.g. account numbers, transaction dates).

---

## 3. Seed Data

Create a `seed.sql` file that inserts:


## Verifications 
CALL transfer_money(<an_existing_account>, <another_account>, 100.00);
SELECT balance FROM accounts WHERE account_id IN (...);
