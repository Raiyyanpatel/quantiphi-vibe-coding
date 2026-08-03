import express from 'express';
import cors from 'cors';
import mealRoutes from './routes/mealRoutes';
import goalRoutes from './routes/goalRoutes';
import summaryRoutes from './routes/summaryRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/meals', mealRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/summary', summaryRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Calorie Tracker API is running');
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});