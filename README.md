# BillDrop

Turns a week of paper supplier bills into clean, checked records in minutes.
Client (made-up): Irumbu Mart, a hardware wholesaler in Salem.

## Live link (M1)
https://REPLACE-WITH-YOUR-VERCEL-LINK.vercel.app

## Stack
- Frontend: React (Vite)
- Backend: Java 17, Spring Boot 3
- Database: MySQL

## Run locally
1. Database: run `database/schema.sql` in MySQL.
2. Backend:
   ```
   cd backend
   set DB_PASSWORD=your_mysql_password   (Windows CMD)
   mvn spring-boot:run
   ```
3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
   Open http://localhost:5173

## Status
- M1: first page online, automatic check, plan (docs/PLAN.pdf) - done
- M2: login, upload, OCR, AI reading, review screen - next

All data is made up. No keys are stored in this repository.
