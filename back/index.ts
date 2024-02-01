import fs from 'fs';

import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import galleryRoutes from './routes/gallery.js';
import postRoutes from './routes/users.js';

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO).then(() => {
      console.log('CONNECTED DO MONGODB');
    });
  } catch (error) {
    throw error;
  }
};

// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('./uploads'));
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(8800, () => {
  connect();
});
