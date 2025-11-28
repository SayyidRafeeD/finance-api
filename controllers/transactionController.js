import asyncHandler from '../middleware/asyncHandler.js';
import * as transactionRepo from '../repositories/transactionRepository.js';
import { successResponse } from '../utils/response.js';

const getTransactions = asyncHandler(async (req, res) => {
    const { type } = req.query;

    const transactions = await transactionRepo.findTransactions(req.user._id, type);

    return successResponse(res, 'Data transaksi berhasil diambil', transactions);
});

const addTransaction = asyncHandler(async (req, res) => {
    const { text, amount, type } = req.body;

    const data = {
        text,
        amount: Number(amount),
        type,
        user: req.user._id,
    };

    const createdTransaction = await transactionRepo.createTransaction(data);
    
    return successResponse(res, 'Transaksi berhasil ditambahkan', createdTransaction, 201);
});

const updateTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user._id;
    const updates = req.body;

    try {
        const updatedData = await transactionRepo.updateTransaction(transactionId, userId, updates);
        return successResponse(res, 'Transaksi berhasil diperbarui', updatedData);
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message);
    }
});

const deleteTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user._id;

    try {
        await transactionRepo.removeTransaction(transactionId, userId);
        return successResponse(res, 'Transaksi berhasil dihapus');
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message);
    }
});

export {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
};