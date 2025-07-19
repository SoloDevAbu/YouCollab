import cookieParser from 'cookie-parser';
import express, { json } from 'express';
const app = express();
import mainRoute from './route/mainroute.js';
import authRoute from './route/youtubeAuthRoute.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = ['http://localhost:5173', 'https://you-collab.vercel.app'];
const isDevelopment = process.env.NODE_ENV === 'development';

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(json());
app.use(cookieParser());

app.use('/api/v1/', mainRoute);
app.use('/api/youtube/', authRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  console.log('Environment:', process.env.NODE_ENV);
});