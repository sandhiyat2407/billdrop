-- BillDrop tables (from the Client Brief). Run once in MySQL.
CREATE DATABASE IF NOT EXISTS billdrop;
USE billdrop;

CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  role ENUM('accountant','manager') NOT NULL,
  login_id VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS batches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uploaded_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES people(id)
);

CREATE TABLE IF NOT EXISTS bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_id INT NOT NULL,
  supplier_id INT NULL,
  bill_number VARCHAR(60),
  bill_date DATE,
  total DECIMAL(12,2),
  lines_total DECIMAL(12,2),
  file_path VARCHAR(300),
  ocr_text TEXT,
  status ENUM('waiting','reading','ready','problem','saved','failed') DEFAULT 'waiting',
  problem VARCHAR(200) NULL,
  saved_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (batch_id) REFERENCES batches(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE IF NOT EXISTS bill_lines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NOT NULL,
  description VARCHAR(200),
  amount DECIMAL(12,2),
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
);
