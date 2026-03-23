# FPL Analytics Engine ⚽️📈

A high-performance **Full-Stack Web Application** designed to help Fantasy Premier League (FPL) managers make data-driven transfer decisions. By calculating custom value metrics and identifying high-form differentials, this tool identifies "budget enablers" that the official FPL interface often misses.

---

## 🚀 Core Features

* **Value Per Million (VPM) Calculation:** Custom algorithm that ranks players by `Total Points / Current Price` to find the most efficient assets.
* **Real-Time Differential Finder:** Dynamic filtering for "hidden gems" with < 10% ownership and high recent form.
* **Search & Filter:** Instant, client-side filtering of players using React state and optional chaining for crash-resistance.
* **Official FPL Integration:** Seamlessly pulls player data and action-shot imagery from the Premier League's CDN.
* **FinTech Integration (SaaS Ready):** Built-in support for **Flutterwave**, enabling Mobile Money (MTN/Airtel) payments for premium features.
* **Responsive Design:** Fully mobile-optimized UI built with Tailwind CSS v4.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS v4, Lucide React, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Security** | Bcrypt.js (Password Hashing), Dotenv |
| **Payments** | Flutterwave API (Mobile Money Optimized) |

---

## 🏗 Architecture & Design Patterns

### **1. Data Transformation (DTO Pattern)**
The application uses a `formatPlayerData` helper in the backend to normalize raw FPL data. This reduces the API payload size by **~85%**, ensuring fast load times and lower data consumption for users.

### **2. Defensive Programming**
The frontend utilizes **Optional Chaining (`?.`)** and **Nullish Coalescing** to ensure that if the external FPL API returns incomplete data or unexpected null values, the UI remains functional and does not crash.

### **3. Optimized Caching**
Implements HTTP 304 status checks and server-side caching to minimize redundant API calls to the official FPL servers, adhering to rate-limiting best practices.

---

## 📦 Installation & Setup

### **Prerequisites**
* Node.js (v18+)
* MongoDB Atlas Account
* Ubuntu/Linux environment (Recommended)

### **Backend Setup**
1. Navigate to the backend folder:
   ```bash
   cd fpl-backend
   npm install
