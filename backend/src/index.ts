import express from 'express';
import cors from 'cors';
import mealRoutes from './routes/mealRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/meals', mealRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Calorie Tracker API is running');
});

// Global Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
