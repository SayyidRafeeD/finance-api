import asyncHandler from '../middleware/asyncHandler.js';
import * as transactionRepo from '../repositories/transactionRepository.js';

const getTransactions = asyncHandler(async (req, res) => {
    const { type } = req.query;

    const transactions = await transactionRepo.findTransactions(req.user._id, type);

    res.status(200).json(transactions);
});

const addTransaction = asyncHandler(async (req, res) => {
    const { text, amount, type } = req.body;

    if (!text || !amount || !type) {
        res.status(400);
        throw new Error('Text, amount, and type are required');
    }

    const data = {
        text,
        amount: Number(amount),
        type,
        user: req.user._id,
    };

    const createdTransaction = await transactionRepo.createTransaction(data);
    res.status(201).json(createdTransaction);
});

const deleteTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user._id;

    try {
        await transactionRepo.removeTransaction(transactionId, userId);
        res.status(200).json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(error.status || 500);
        throw new Error(error.message);
    }
});

export {
    getTransactions,
    addTransaction,
    deleteTransaction
};