import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import { errorHandler } from './middlewares/errorHandler';
import { httpLogger } from './logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Middleware to handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use(errorHandler);

export default app;
