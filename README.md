# 🥗 Vibe Nutrition Tracker

A modern, responsive, and sleek single-page application for tracking daily nutrition, hitting macronutrient goals, and logging meals. Built with a robust full-stack architecture focusing on aesthetic UI, robust validation, and real-time state management.

---

## ✨ Features

1. **Dynamic Calorie & Macro Tracking**: Automatically calculates daily totals against specific targets based on your active fitness goal. Visualizes calories, protein, carbs, and fats consumed vs. remaining using dynamic progress bars.
2. **Goal Setting**: Switch between Weight Loss, Maintenance, and Muscle Gain seamlessly. The dashboard recalibrates instantly.
3. **Precision Food Logging**: Log any food item with an exact weight in grams. The backend scales the nutritional data against a 100g baseline with high precision.
4. **"AI" Image Analysis**: A mocked image upload flow that automatically analyzes food photos to autofill the logging form.
5. **Premium UI/UX**: Built with Tailwind CSS, featuring subtle glassmorphism, micro-interactions, responsive design, and smooth Toast notifications (`react-hot-toast`). Uses `lucide-react` for polished iconography.
6. **Centralized State Management**: Powered by React Context for scalable and prop-drilling-free data flow.
7. **Robust Validation**: Server-side validation ensures accurate data entry (prevents zero/negative weights, extremely large weights, and invalid food names).

---

## 🏗️ System Architecture

The application is built using a decoupled architecture, separating the client UI from the backend API:
- **Frontend (React + Vite)**: TypeScript, Tailwind CSS, `lucide-react`, `react-hot-toast`, React Context API, Axios, `react-hook-form`. It handles UI state, data visualization, and user inputs.
- **Backend (Node.js + Express)**: TypeScript, MVC Architecture (Controllers, Routes, Services). It manages business logic, in-memory state storage, macro calculations, input validation, and scaling logic based on active goals.

---

## 📂 Folder Structure

```text
quantiphi-vibe-coding/
├── backend/                  # Express Server
│   ├── src/
│   │   ├── controllers/      # Route handlers (mealController, goalController, summaryController)
│   │   ├── middleware/       # Custom Express middleware (errorHandler)
│   │   ├── models/           # TypeScript interfaces (Meal, Goal)
│   │   ├── routes/           # API endpoints routing
│   │   ├── services/         # Core business logic & state (mealService, goalService, summaryService)
│   │   ├── utils/            # Helpers & mock datasets (foodData, responseHelper)
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                 # React Application
    ├── src/
    │   ├── assets/           # Static assets
    │   ├── components/       # Reusable UI elements (FoodLogForm, GoalToggle, CalorieProgressBar, MacroCard, MealHistory)
    │   ├── context/          # React Context (DashboardContext.tsx)
    │   ├── hooks/            # Custom React hooks (useDashboard)
    │   ├── pages/            # Page layouts (Dashboard)
    │   ├── services/         # API integration (api.ts - Axios instance)
    │   ├── types/            # Frontend TypeScript interfaces
    │   ├── App.tsx           # Root React component
    │   └── main.tsx          # React DOM renderer
    ├── tailwind.config.js    # Tailwind styling configuration
    ├── package.json
    └── vite.config.ts        # Vite bundler configuration
```

---

## 🚀 Setup Instructions

### 1. Start the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
npm run dev
```
The backend will start on `http://localhost:5000`.

### 2. Start the Frontend
Open a new, separate terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`.

---

## 📖 API Documentation

The backend exposes the following RESTful endpoints running on `/api`:

### Meals
- **`GET /api/meals`**
  - Returns a list of all logged meals for the day.
- **`POST /api/meals`**
  - Body: `{ "name": "string", "weight": number }`
  - Creates a new meal and calculates its macros. Enforces strict input validation on names and weights.
- **`DELETE /api/meals/:id`**
  - Deletes a specific meal by ID.
- **`POST /api/meals/analyze-image`**
  - Mocks an AI image processing flow, returning a predefined food item and weight.

### Dashboard Summary
- **`GET /api/summary`**
  - Returns the comprehensive daily calculation including `totalCalories`, macros, progress percentages, and whether the limit `isExceeded`.

### Goals
- **`GET /api/goals`**
  - Returns the current active goal (`weight_loss`, `maintenance`, `muscle_gain`).
- **`PUT /api/goals`**
  - Body: `{ "goal": "string" }`
  - Updates the active goal, instantly recalculating the user's calorie and macro targets.

---

## 🔮 Future Improvements

1. **Persistent Database**: Migrate the in-memory data store to PostgreSQL or MongoDB for data persistence across server restarts.
2. **Real AI Integration**: Hook up the `/analyze-image` endpoint to a real Vision API (e.g., Google Cloud Vision or OpenAI GPT-4V) for actual food recognition from images.
3. **User Authentication**: Add JWT-based auth to support multiple users, secure logins, and private meal histories.
4. **Historical Data Tracking**: Add date-picking capabilities and a time-series database structure to view and log meals for previous days, generating weekly and monthly macro trends.
5. **Live Nutrition API**: Connect the backend to a real nutrition database (like USDA or Edamam) to accurately pull nutritional data for any food name searched by the user instead of relying on the mock fallback calculation.
