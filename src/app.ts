import express from 'express';
// import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'https://trexo-frontend.web.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://trexo-frontend.web.app/'); // or '*'
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.get('/ping', (req, res) => {
  res.send('pong');
});

export default app;
