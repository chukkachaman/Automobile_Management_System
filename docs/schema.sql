-- ============================================================
--  Automobile Shop Management System — Database Schema
--  Author : Chukka Chamantej
--  GitHub : https://github.com/chukkachaman
-- ============================================================

CREATE DATABASE IF NOT EXISTS automobile;
USE automobile;

-- --------------------------------------------------------
-- Core Tables
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    user_id    BIGINT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255),
    role       ENUM('ADMIN', 'RECEPTIONIST') NOT NULL,
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    house_no   VARCHAR(255),
    street     VARCHAR(255),
    locality   VARCHAR(255),
    city       VARCHAR(255),
    pin_code   VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS customer (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    house_no    VARCHAR(255),
    street      VARCHAR(255),
    locality    VARCHAR(255),
    city        VARCHAR(255),
    pin_code    VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS vehicle (
    vehicle_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    registration_no VARCHAR(255),
    brand           VARCHAR(255),
    model           VARCHAR(255),
    year            INT,
    fuel_type       VARCHAR(50),
    customer_id     BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mechanic (
    mechanic_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    house_no    VARCHAR(255),
    street      VARCHAR(255),
    locality    VARCHAR(255),
    city        VARCHAR(255),
    pin_code    VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS service (
    service_id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255),
    description  TEXT
);

CREATE TABLE IF NOT EXISTS inventory (
    part_id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    name               VARCHAR(255),
    quantity_available INT,
    unit_price         DOUBLE
);

-- --------------------------------------------------------
-- Multi-valued Attribute Tables
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS customer_email (
    customer_id BIGINT      NOT NULL,
    email       VARCHAR(255) NOT NULL,
    PRIMARY KEY (customer_id, email),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS customer_middle_name (
    customer_id  BIGINT      NOT NULL,
    middle_name  VARCHAR(255) NOT NULL,
    PRIMARY KEY (customer_id, middle_name),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_email (
    user_id BIGINT      NOT NULL,
    email   VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, email),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_middle_name (
    user_id     BIGINT      NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, middle_name),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mechanic_phone (
    mechanic_id  BIGINT      NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    PRIMARY KEY (mechanic_id, phone_number),
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(mechanic_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mechanic_middle_name (
    mechanic_id BIGINT      NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (mechanic_id, middle_name),
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(mechanic_id) ON DELETE CASCADE
);

-- --------------------------------------------------------
-- Relationship Tables
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS can_do (
    mechanic_id BIGINT NOT NULL,
    service_id  BIGINT NOT NULL,
    PRIMARY KEY (mechanic_id, service_id),
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(mechanic_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id)  REFERENCES service(service_id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointment (
    appointment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id        BIGINT      NOT NULL,
    vehicle_id     BIGINT      NOT NULL,
    date_time      DATETIME    NOT NULL,
    created_at     DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status         ENUM('BOOKED','ONGOING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'BOOKED',
    FOREIGN KEY (user_id)    REFERENCES users(user_id)     ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointment_services (
    appointment_id BIGINT NOT NULL,
    service_id     BIGINT NOT NULL,
    PRIMARY KEY (appointment_id, service_id),
    FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id)     REFERENCES service(service_id)         ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invoice (
    invoice_id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_id  BIGINT UNIQUE,
    tax_percentage  DOUBLE,
    labour_cost     DOUBLE,
    FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invoice_mechanic (
    invoice_id  BIGINT NOT NULL,
    mechanic_id BIGINT NOT NULL,
    PRIMARY KEY (invoice_id, mechanic_id),
    FOREIGN KEY (invoice_id)  REFERENCES invoice(invoice_id)   ON DELETE CASCADE,
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(mechanic_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS uses (
    invoice_id BIGINT NOT NULL,
    part_id    BIGINT NOT NULL,
    count      INT,
    PRIMARY KEY (invoice_id, part_id),
    FOREIGN KEY (invoice_id) REFERENCES invoice(invoice_id)    ON DELETE CASCADE,
    FOREIGN KEY (part_id)    REFERENCES inventory(part_id)     ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS required (
    invoice_id  BIGINT NOT NULL,
    mechanic_id BIGINT NOT NULL,
    description TEXT,
    PRIMARY KEY (invoice_id, mechanic_id),
    FOREIGN KEY (invoice_id)  REFERENCES invoice(invoice_id)   ON DELETE CASCADE,
    FOREIGN KEY (mechanic_id) REFERENCES mechanic(mechanic_id) ON DELETE CASCADE
);
