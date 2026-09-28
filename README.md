# 🛒 Full-Stack Amazon Clone

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

> [!IMPORTANT]
> **Live Demo Notes:**
> * **API Cold Start:** The backend is hosted on Render's free tier. If the backend hasn't received traffic in 15 minutes, it goes to sleep. **Please allow ~50 seconds for the server to wake up** when testing the Stripe checkout process!
> * **Product Data:** This project fetches product data from the free `FakeStoreAPI`. If the homepage products fail to load, that API is likely experiencing temporary downtime.

A fully functional, full-stack e-commerce application modeled after Amazon. Built with modern web technologies, this project features robust user authentication, a complete shopping cart system, real payment processing, and a scalable, Dockerized architecture.

## ✨ Key Features

*   **💳 Real Payment Processing:** Fully integrated with the Stripe API to securely handle real-world credit card transactions.
*   **🔐 Authentication:** Secure user sign-up and login utilizing Firebase Authentication.
*   **📦 Order History:** Automatically saves successful purchases to a Firebase Firestore database, rendering a historic orders page for the user.
*   **🛒 Shopping Cart:** Global state management to handle adding, removing, and calculating totals for cart items dynamically.
*   **🔒 Protected Routes:** Ensures that sensitive pages (like checkout and orders) are only accessible to authenticated users.
*   **🐳 Fully Dockerized:** The entire application (both frontend and backend) is containerized using Docker and Orchestrated with Docker Compose for seamless deployment anywhere.

## 🏗️ Architecture

This project follows a clean, decoupled architecture:
*   **Frontend (`/Amazone-Replica`):** A blazing fast React single-page application built with Vite. When containerized, it is built statically and served by a lightweight **Nginx** web server.
*   **Backend (`/amazon-api`):** A custom Node.js / Express.js REST API dedicated entirely to securely creating Stripe Payment Intents and keeping secrets hidden from the client.

## 🚀 Getting Started (Docker)

The absolute easiest way to run this project is using Docker.

### Prerequisites
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
*   A Stripe account (for secret/public keys).
*   A Firebase project.

### Environment Setup
You will need to create two `.env` files. 

1. **Frontend (`/Amazone-Replica/.env`):**
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

2. **Backend (`/amazon-api/.env`):**
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### Running the App
From the root directory of the project, simply run:
```bash
docker-compose up --build
```
*   The frontend will be available at: `http://localhost:5173`
*   The backend API will run on: `http://localhost:5000`

## 🛠️ Getting Started (Manual)

If you prefer to run the development servers manually without Docker:

**1. Start the Backend:**
```bash
cd amazon-api
npm install
npm start
```

**2. Start the Frontend:**
```bash
cd Amazone-Replica
npm install
npm run dev
```

## 🤝 Lessons Learned
*   Building robust multi-stage Dockerfiles for React/Vite applications and configuring Nginx for client-side routing fallback.
*   Securely separating frontend capabilities from backend responsibilities (never processing payments client-side).
*   Mastering Firebase Firestore schema design for per-user sub-collections (e.g., `users/{uid}/orders/{orderId}`).
