import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth'; // adjust if needed
import sellRoutes from './routes/sell';
import viewRoutes from './routes/view'; // add this line, adjust the path if needed
import adminRoutes from './routes/admin'; // add this line, adjust the path if needed
const app = express();

// ✅ Body parser to fix req.body undefined error
app.use(express.json());

// ✅ Optional: If you're sending form-urlencoded data
// app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/sell', sellRoutes);
app.use('/api/view', viewRoutes);
app.use('/api/admin', adminRoutes);
export default app;
