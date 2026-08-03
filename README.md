# The Calorie Tracker & Macro Dashboard

A health-tracking prototype that serves as a user's daily food journal. 

## Current Implementation Status

### Architecture
- **Frontend**: React, Vite, TypeScript, Tailwind CSS v3, Axios.
- **Backend**: Node.js, Express, TypeScript.

### What has been built so far?
1. **Frontend Structure**: Scaffolded the complete Vite React application with dedicated directories for `components`, `pages`, `hooks`, `context`, `services`, and `types`. A placeholder Dashboard component is actively rendering.
2. **Backend Structure**: Initialized a complete Express Server following the MVC (Model-View-Controller) architecture.
3. **Mock Dataset**: Created a comprehensive mock dataset of common foods containing macros (Calories, Protein, Carbs, Fats) per 100g.
4. **Backend API Endpoints**:
   - `GET /api/meals`: Retrieves all logged meals from memory, sorted by latest first.
   - `POST /api/meals`: Accepts a food name and weight, validates the input, calculates and scales the exact nutritional values against the 100g baseline, and stores the new meal.
   - `DELETE /api/meals/:id`: Removes a logged meal from memory and returns the updated list.

### Setup Instructions

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
