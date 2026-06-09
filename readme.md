# Automobile Shop Management System

## Project Overview

A **full-stack web application** for managing automobile shop operations — built with **Spring Boot (Java)**, **React (JavaScript)**, and **MySQL**.

Features customer management, vehicle records, service tracking, mechanic assignments, inventory, invoices, and appointment scheduling.

---

## Tech Stack

### Backend
- **Spring Boot 3** — REST APIs
- **Spring Security + JWT** — authentication & authorization
- **Hibernate / JPA** — ORM with MySQL
- **Maven** — build tool
- **spring-dotenv** — `.env`-based config

### Frontend
- **React 19 + Vite** — UI framework
- **React Router v7** — client-side routing
- **Bootstrap 5** — styling
- **JWT-decode** — token handling

### Database
- **MySQL** — relational data store
- Entities: `Customer`, `Vehicle`, `ServiceEntity`, `Mechanic`, `Appointment`, `Inventory`, `Invoice`
- Many-to-many relationships via composite-key join entities

---

## Features

- **Auth** — JWT-based login/register with role-based access (ADMIN / CUSTOMER)
- **Customer Management** — add, update, view, delete customers
- **Vehicle Records** — link vehicles to customers
- **Services** — track ongoing and completed repairs; assign mechanics
- **Mechanics** — manage mechanic profiles, phone numbers, skills
- **Appointments** — schedule and edit service appointments
- **Inventory** — manage parts stock with quantity checks
- **Invoices** — generate and view invoices per service
- **Responsive UI** — works across screen sizes

---

## Setup Instructions

### Prerequisites
- Java 21+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

### 1. Clone the repository

```bash
git clone https://github.com/chukkachaman/Automobile_Management_System.git
cd Automobile_Management_System
```

### 2. Create MySQL database

```sql
CREATE DATABASE automobile;
```

### 3. Configure Backend — create `.env` in the `backend/` folder

```env
SPRING_APPLICATION_NAME=automobileshop
DB_URL=jdbc:mysql://localhost:3306/automobile
DB_USERNAME=root
DB_PASSWORD=your_password_here
JPA_SHOW_SQL=true
JPA_HIBERNATE_DDL=update
JPA_DIALECT=org.hibernate.dialect.MySQLDialect
JWT_SECRET=your_super_secret_key_here_at_least_32_chars
JWT_EXPIRATION_MS=86400000
```

### 4. Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts on `http://localhost:8080`.

### 5. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts on `http://localhost:5173` and proxies `/api` calls to the backend.

---

## Project Structure

```
Automobile_Management_System/
├── backend/          # Spring Boot application
│   ├── src/main/java/com/chamantej/automobiles/
│   │   ├── entity/   # JPA entities
│   │   ├── dto/      # Data transfer objects
│   │   ├── service/  # Business logic
│   │   ├── controller/
│   │   └── security/ # JWT filter, config
│   └── src/main/resources/
│       └── application.properties
└── frontend/         # React + Vite application
    └── src/
        ├── components/
        └── store/
```

---

## Author

**Chukka Chamantej**
GitHub: [chukkachaman](https://github.com/chukkachaman)
