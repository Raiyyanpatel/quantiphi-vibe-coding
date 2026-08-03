# The Calorie Tracker & Macro Dashboard

## 📖 Overview
A sleek, modern health-tracking prototype that serves as a user's daily food journal. It allows users to log meals, select specific fitness goals (Weight Loss, Maintenance, Muscle Gain), and seamlessly tracks daily caloric and macronutrient progress against dynamically updating targets.

## 🏗️ System Architecture
The application is built using a decoupled architecture, separating the client UI from the backend API:
- **Frontend (Client)**: React, Vite, TypeScript, Tailwind CSS, Axios, React Hook Form. It handles UI state, data visualization, and user inputs.
- **Backend (Server)**: Node.js, Express, TypeScript. It manages business logic, in-memory state storage, macro calculations, and scaling logic based on active goals.

## ✨ Features
1. **Dynamic Fitness Goals**: Choose between Weight Loss, Maintenance, and Muscle Gain. The system automatically recalculates your daily calorie limit and macro targets based on the selection.
2. **Precision Food Logging**: Log any food item from the built-in mock dataset (e.g., Chicken Breast, Rice, Apple) with an exact weight in grams. The backend scales the nutritional data against a 100g baseline with high precision.
3. **Macro Tracking**: Visualizes calories, protein, carbs, and fats consumed vs. remaining using dynamic progress bars.
4. **Daily History Management**: View all logged meals in a tabular history format with the ability to delete specific meals and instantly reverse their macro impact.
5. **Robust Validation**: Server-side and client-side validation ensures accurate data entry.

## 📂 File Structure

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
    │   ├── context/          # React Context (if applicable)
    │   ├── hooks/            # Custom React hooks
    │   ├── pages/            # Page layouts (Dashboard)
    │   ├── services/         # API integration (api.ts - Axios instance)
    │   ├── types/            # Frontend TypeScript interfaces
    │   ├── App.tsx           # Root React component
    │   └── main.tsx          # React DOM renderer
    ├── tailwind.config.js    # Tailwind styling configuration
    ├── package.json
    └── vite.config.ts        # Vite bundler configuration
```

## 🚀 Run Commands

### Starting the Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Express development server (runs on port 5000):
   ```bash
   npm run dev
   ```

### Starting the Frontend
1. Open a new, separate terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite development server (usually runs on port 5173):
   ```bash
   npm run dev
   ```
