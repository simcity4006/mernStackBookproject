import express from 'express';
import cors from 'cors';
import { PORT, mongodb } from './config.js';
import mongoose from 'mongoose';
import booksRoutes from './routes/bookRoute.js';
const app = express();
//middlewere for parsing request body
app.use(express.json());
app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['get', 'PUT', 'post', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use('/books', booksRoutes);
mongoose
  .connect(mongodb)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
