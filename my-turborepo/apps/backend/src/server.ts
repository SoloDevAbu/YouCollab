import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mainRoute from './routes/mainRoute';
import authRoute from './routes/youtubeAuthRoute';

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://you-collab.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/', mainRoute);
app.use('/api/youtube/', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
