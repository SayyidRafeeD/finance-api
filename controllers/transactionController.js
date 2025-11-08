import asyncHandler from '../middleware/asyncHandler.js';
import Transaction from '../models/transactionModel.js';
import mongoose from 'mongoose';

const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user._id });
    res.status(200).json(transactions);
});

const addTransaction = asyncHandler(async (req, res) => {
    const { text, amount, type } = req.body;

    if (!text || !amount || !type) {
        res.status(400);
        throw new Error('Text, amount, and type are required');
    }

    const transaction = new Transaction({
        text,
        amount: Number(amount),
        type,
        user: req.user._id,
    });

    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
});

const deleteTransaction = asyncHandler(async (req, res) => {
    const transactionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    const transaction = await Transaction.findById(transactionId);

    if (transaction) {
        if (transaction.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to delete this transaction');
        }

        await Transaction.deleteOne({ _id: transaction._id });
        res.status(200).json({ message: 'Transaction removed' });
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

export {
    getTransactions,
    addTransaction,
    deleteTransaction
};