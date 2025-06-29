-- Create Bank Database
CREATE DATABASE IF NOT EXISTS bank_db;
USE bank_db;

-- Create Branches Table
CREATE TABLE branches (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Employees Table
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

-- Create Customers Table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    ssn VARCHAR(11) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Account Types Table
CREATE TABLE account_types (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(50) NOT NULL,
    description TEXT,
    minimum_balance DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL
);

-- Create Accounts Table
CREATE TABLE accounts (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    branch_id INT NOT NULL,
    type_id INT NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    status ENUM('active', 'inactive', 'frozen') DEFAULT 'active',
    opened_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (type_id) REFERENCES account_types(type_id)
);

-- Create Transactions Table
CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    account_id INT NOT NULL,
    transaction_type ENUM('deposit', 'withdrawal', 'transfer', 'interest') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- Insert Sample Data for Branches
INSERT INTO branches (branch_name, address, city, state, zip_code, phone) VALUES
('Main Branch', '123 Main St', 'New York', 'NY', '10001', '212-555-0101'),
('Downtown Branch', '456 Market St', 'San Francisco', 'CA', '94105', '415-555-0102'),
('Westside Branch', '789 West Ave', 'Los Angeles', 'CA', '90001', '213-555-0103');

-- Insert Sample Data for Account Types
INSERT INTO account_types (type_name, description, minimum_balance, interest_rate) VALUES
('Savings', 'Basic savings account with interest', 100.00, 0.02),
('Checking', 'Regular checking account', 0.00, 0.00),
('Premium Savings', 'High-yield savings account', 1000.00, 0.035),
('Business Checking', 'Business checking account', 500.00, 0.00);

-- Insert Sample Data for Employees
INSERT INTO employees (branch_id, first_name, last_name, position, email, phone, hire_date, salary) VALUES
(1, 'John', 'Smith', 'Branch Manager', 'john.smith@bank.com', '212-555-0104', '2020-01-15', 75000.00),
(1, 'Sarah', 'Johnson', 'Loan Officer', 'sarah.johnson@bank.com', '212-555-0105', '2021-03-20', 65000.00),
(2, 'Michael', 'Brown', 'Branch Manager', 'michael.brown@bank.com', '415-555-0106', '2019-06-10', 78000.00);

-- Insert Sample Data for Customers
INSERT INTO customers (first_name, last_name, email, phone, address, city, state, zip_code, date_of_birth, ssn) VALUES
('Alice', 'Johnson', 'alice.j@email.com', '212-555-0107', '123 Oak St', 'New York', 'NY', '10002', '1985-05-15', '123-45-6789'),
('Robert', 'Williams', 'robert.w@email.com', '415-555-0108', '456 Pine St', 'San Francisco', 'CA', '94106', '1990-08-22', '234-56-7890'),
('Emily', 'Davis', 'emily.d@email.com', '213-555-0109', '789 Maple St', 'Los Angeles', 'CA', '90002', '1988-11-30', '345-67-8901');

-- Insert Sample Data for Accounts
INSERT INTO accounts (customer_id, branch_id, type_id, account_number, balance, status) VALUES
(1, 1, 1, 'SAV1001', 5000.00, 'active'),
(1, 1, 2, 'CHK1001', 2500.00, 'active'),
(2, 2, 3, 'PSV2001', 15000.00, 'active'),
(3, 3, 4, 'BCH3001', 8000.00, 'active');

-- Insert Sample Data for Transactions
INSERT INTO transactions (account_id, transaction_type, amount, description) VALUES
(1, 'deposit', 1000.00, 'Initial deposit'),
(1, 'interest', 50.00, 'Monthly interest'),
(2, 'deposit', 500.00, 'Salary deposit'),
(3, 'withdrawal', 200.00, 'ATM withdrawal'),
(4, 'transfer', 1000.00, 'Transfer to savings');

-- Create indexes for better performance
CREATE INDEX idx_customer_name ON customers(last_name, first_name);
CREATE INDEX idx_account_number ON accounts(account_number);
CREATE INDEX idx_transaction_date ON transactions(transaction_date);
CREATE INDEX idx_branch_location ON branches(city, state);

-- Create a view for account summary
CREATE VIEW account_summary AS
SELECT 
    a.account_id,
    a.account_number,
    c.first_name,
    c.last_name,
    at.type_name,
    a.balance,
    b.branch_name
FROM accounts a
JOIN customers c ON a.customer_id = c.customer_id
JOIN account_types at ON a.type_id = at.type_id
JOIN branches b ON a.branch_id = b.branch_id;

-- Create a stored procedure for transferring money between accounts
DELIMITER //
CREATE PROCEDURE transfer_money(
    IN from_account_id INT,
    IN to_account_id INT,
    IN transfer_amount DECIMAL(15,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transfer failed';
    END;

    START TRANSACTION;
    
    -- Deduct from source account
    UPDATE accounts 
    SET balance = balance - transfer_amount 
    WHERE account_id = from_account_id;
    
    -- Add to destination account
    UPDATE accounts 
    SET balance = balance + transfer_amount 
    WHERE account_id = to_account_id;
    
    -- Record the transaction
    INSERT INTO transactions (account_id, transaction_type, amount, description)
    VALUES (from_account_id, 'transfer', transfer_amount, 'Transfer to another account');
    
    COMMIT;
END //
DELIMITER ;
