// Lokasi: server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
// import transactionRoutes from './routes/transactionRoutes.js'; // Nanti
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Gunakan cookie-parser

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/transactions', transactionRoutes); // Nanti

app.get('/', (req, res) => {
    res.send('Personal Finance API Berjalan...');
});

// Error Handling Middleware (Harus di paling bawah)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});