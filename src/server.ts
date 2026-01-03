import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

// Load dotenv ONLY in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import questionRoutes from './routes/questions';
import examRoutes from './routes/exams';
import attemptRoutes from './routes/attempts';

connectDB();

const app = express();

/* ✅ CORRECT CORS CONFIG */
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://spcbt-nine.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

/* ✅ Handle preflight */
app.options('*', cors());

app.use(express.json());

/* Routes */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/attempts', attemptRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
