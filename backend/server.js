import cookieParser from 'cookie-parser';
import express, { json } from 'express';
const app = express();
import mainRoute from './route/mainroute.js';
import cors from 'cors';

const allowedOrigins = ['http://localhost:5173']

app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(json());
app.use(cookieParser());

app.use('/api/v1/', mainRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});