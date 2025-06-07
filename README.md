# Job Tracker App (WIP)

An application to help users track jobs they’ve applied for — a more user-friendly and organized alternative to managing job applications via Excel sheets. Built using **React + TypeScript** on the frontend and **Spring Boot + Java (17)** on the backend.

This project is still under active development. The goal is to showcase full-stack development capabilities using a modern tech stack and containerized services.

## 🚀 Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Spring Boot (Java 17)
- **Database**: MySQL 8 (via Docker)
- **Auth**: JWT-based authentication

## 📦 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js + npm](https://nodejs.org/) (Recommended: Node 18+)
- Java 17
- Maven (for building the backend)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YasinBou/Job-Tracker.git
cd job-Tracker
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory of the project (same directory as `docker-compose.yml`) and define the required variables:

```
MYSQL_ROOT_PASSWORD=yourRootPassword
MYSQL_DATABASE=jobtrackerdb
MYSQL_USER=jobtrackeruser
MYSQL_PASSWORD=yourDbPassword
```

Also, for the backend, set the following environment variable in your system:

```
SECRET_KEY=your_jwt_secret_key
```

This key is used in the backend for JWT token signing:
```java
private static final String SECRET_KEY = System.getenv("SECRET_KEY");
```

### 3. Start MySQL Using Docker

Make sure Docker is running, then start the MySQL container:

```bash
docker-compose up -d
```

### 4. Install Frontend Dependencies

Navigate to the frontend directory and install npm modules:

```bash
cd frontend
npm install
```

### 5. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

### 6. Run the Frontend

```bash
cd frontend
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📌 Notes

- Make sure environment variables are properly configured before starting services.
- Application is under development; many features may be incomplete.
- JWT authentication is used; login/registration will be required for full access.

## ✨ Project Goals

- Provide a better way to track job applications than spreadsheets.
- Demonstrate modern full-stack development with Dockerized services.
- Build reusable, clean, and maintainable code on both frontend and backend.

