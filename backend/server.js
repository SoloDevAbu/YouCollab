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

// Configure CORS with specific options
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

// Set default cookie options for all routes
app.use((req, res, next) => {
  res.cookie = res.cookie.bind(res);
  const originalCookie = res.cookie;
  res.cookie = function (name, value, options = {}) {
    const defaultOptions = {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: isDevelopment ? 'lax' : 'none',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    if (!isDevelopment) {
      defaultOptions.domain = '.vercel.app';
    }

    return originalCookie.call(this, name, value, { ...defaultOptions, ...options });
  };
  next();
});

app.use('/api/v1/', mainRoute);
app.use('/api/youtube/', authRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  console.log('Environment:', process.env.NODE_ENV);
});