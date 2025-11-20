import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'; 
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.DATA_MODE === 'dummy') {
    console.log('Running in Dummy Data Mode');
} else {
    connectDB();
}

app.use(helmet()); 
app.use(cors());   

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send('API Running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});