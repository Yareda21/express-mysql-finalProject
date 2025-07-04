create database bank_db;

-- Use the database
USE bank_db;

-- 1. Create branches table
CREATE TABLE branches (
  branch_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  address VARCHAR(50),
  city VARCHAR(20),
  state VARCHAR(20),
  zip_code VARCHAR(20),
  phone VARCHAR(14),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create employees table
CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  branch_id INT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  position VARCHAR(20),
  email VARCHAR(30) UNIQUE,
  phone VARCHAR(13),
  hire_date DATE,
  salary INT,
  FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- 3. Create customers table
CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(30) UNIQUE,
  phone VARCHAR(13),
  address VARCHAR(50),
  city VARCHAR(30),
  state VARCHAR(30),
  zip_code VARCHAR(30),
  dob DATE,
  ssn VARCHAR(30) UNIQUE,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create account_types table
CREATE TABLE account_types (
  type_id INT AUTO_INCREMENT PRIMARY KEY,
  type_name VARCHAR(30),
  description VARCHAR(70),
  minimum_balance DECIMAL(10, 2),
  interest_rate DECIMAL(5, 2)
);

-- 5. Create accounts table
CREATE TABLE accounts (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  branch_id INT,
  type_id INT,
  account_number INT UNIQUE,
  balance DECIMAL(10,2),
  status ENUM('active', 'inactive', 'closed'),
  opened DATETIME,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
  FOREIGN KEY (type_id) REFERENCES account_types(type_id)
);

-- 6. Create transactions table
CREATE TABLE transactions (
  transaction_id INT PRIMARY KEY AUTO_INCREMENT,
  account_id INT,
  transaction_type ENUM('deposit', 'withdrawal', 'transfer'),
  amount DECIMAL(10,2),
  description VARCHAR(100),
  timestamps DATETIME,
  FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- ============================
-- Insert seed data
-- ============================

-- Insert into branches
INSERT INTO branches (name, address, city, state, zip_code, phone)
VALUES 
('Main Branch', '123 Main St', 'Addis Ababa', 'AA', '1000', '251-111-2222'),
('North Branch', '456 North Rd', 'Gondar', 'GD', '2000', '251-333-4444');

-- Insert into employees
INSERT INTO employees (branch_id, first_name, last_name, position, email, phone, hire_date, salary)
VALUES 
(1, 'Abebe', 'Kebede', 'Manager', 'abebe@bank.com', '0911000000', '2021-01-10', 50000),
(2, 'Sara', 'Gebru', 'Teller', 'sara@bank.com', '0911222333', '2022-03-15', 30000);

-- Insert into customers
INSERT INTO customers (first_name, last_name, email, phone, address, city, state, zip_code, dob, ssn)
VALUES 
('Daniel', 'Tesfaye', 'daniel@gmail.com', '0911333444', '1 Sunshine Ave', 'Addis Ababa', 'AA', '1000', '1990-05-12', '123-45-6789'),
('Lily', 'Alemu', 'lily@yahoo.com', '0911444555', '22 Meskel Sq', 'Bahir Dar', 'BD', '2000', '1995-08-24', '987-65-4321');

-- Insert into account_types
INSERT INTO account_types (type_name, description, minimum_balance, interest_rate)
VALUES 
('Checking', 'Basic checking account', 100.00, 0.5),
('Savings', 'High-yield savings account', 500.00, 1.5);

-- Insert into accounts (including customer_id, branch_id, type_id)
INSERT INTO accounts (customer_id, branch_id, type_id, account_number, balance, status, opened)
VALUES 
(1, 1, 1, 10000001, 1500.00, 'active', NOW()),
(2, 2, 2, 10000002, 2500.00, 'active', NOW());

-- Insert into transactions (account_id must match account_id from above inserts)
INSERT INTO transactions (account_id, transaction_type, amount, description, timestamps)
VALUES 
(1, 'deposit', 500.00, 'Initial deposit', NOW()),
(2, 'deposit', 1000.00, 'Initial deposit', NOW());

-- ============================
-- View data
-- ============================

use bank_db;

-- Create indexes for better performance
CREATE INDEX idx_customer_name ON customers(last_name, first_name);
CREATE INDEX idx_account_number ON accounts(account_number);
CREATE INDEX idx_transaction_date ON transactions(timestamps);
CREATE INDEX idx_branch_location ON branches(city, state);



ALTER TABLE branches 
RENAME COLUMN name TO branch_name ;


-- Create a view for account summary
CREATE VIEW account_summary AS
SELECT 
    a.account_id,
    a.account_number,
    c.first_name,
    c.last_name,
    t.type_name,
    a.balance,
    b.branch_name
FROM accounts a
JOIN customers c ON a.customer_id = c.customer_id
JOIN account_types t ON t.type_id = t.type_id
JOIN branches b ON a.branch_id = b.branch_id;

DELIMITER//
CREATE PROCEDURE transfer_money(
    IN from_account_id INT,
    IN to_account_id INT,
    IN transfer_amount DECIMAL(15,2)
)

BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MASSAGE_TEXT = 'transfer failed';
	END;
    
    START TRANSACTION;
    
    UPDATE accounts
    SET balance = balance - transfer_amount
    where account_id = from_account_id;
    
    UPDATE accounts 
    SET balance = balance + transfer_amount 
    WHERE account_id = to_account_id;
    
    INSERT INTO transactions (account_id, transaction_type, amount, description)
	VALUES (from_account_id, 'transfer', transfer_amount, 'Transfer to another account');
   
    COMMIT;

END //
DELIMITER;

use bank_db;

