# 🏠 RealEstate Buyer Portal

A simple property marketplace where buyers can browse listings and manage a personal favourites list.

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL (Supabase)
- **Auth:** JWT (JSON Web Tokens)

---

## 🚀 How to Run locally

### 1. Backend Setup

1. Go to `backend/` folder and run `npm install`.
2. Create a `.env` file:

   ```env
   DATABASE_URL=your_supabase_url
   JWT_SECRET=your_secret
   PORT=5000
   ```

   Run npm run dev.

3. Frontend Setup
   Go to `frontend/` folder and run `npm install`.
   Create a `.env` file:
   VITE_API_URL=http://localhost:5000/api
   Run npm run dev and open http://localhost:5173.

`Example User Flows`

1. Register & Login: Create a new Buyer account and log in.
2. Browse: View live property listings on the Home page.
3. Save Favourites: Click the Heart Icon on a property. You will see a success toast, and the heart will turn red.
4. Dashboard: Navigate to your Dashboard to see your Name, Role, and all your saved properties.
5. Remove: Click Remove on any property in your Dashboard to update your collection instantly.
6. Guest Protection: If you try to save a property while logged out, the app will toast "Please login!" and redirect you to the login page.
