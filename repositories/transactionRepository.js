import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';
import {
    getDummyTransactions,
    addDummyTransaction,
    updateDummyTransaction,
    deleteDummyTransaction
} from '../data/dummyData.js';
import { isDummyMode } from '../utils/constants.js';

const buildQuery = (userId, type) => {
    const query = { user: userId };
    if (type) {
        query.type = type;
    }
    return query;
};

export const findTransactions = async (userId, type) => {
    if (isDummyMode()) {
        return getDummyTransactions(userId, type);
    }

    const query = buildQuery(userId, type);
    return await Transaction.find(query);
};

export const createTransaction = async (data) => {
    if (isDummyMode()) {
        return addDummyTransaction({ ...data, user: data.user }); 
    }

    const transaction = new Transaction(data);
    return await transaction.save();
};

export const updateTransaction = async (id, userId, updates) => {
    if (isDummyMode()) {
        const updatedTx = await updateDummyTransaction(id, userId, updates);
        
        if (!updatedTx) {
            const error = new Error('Transaction not found or not authorized');
            error.status = 404;
            throw error;
        }
        return updatedTx;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Transaction not found (Invalid ID)');
        error.status = 404;
        throw error;
    }

    const transaction = await Transaction.findOne({ _id: id });

    if (!transaction) {
        const error = new Error('Transaction not found');
        error.status = 404;
        throw error;
    }

    if (transaction.user.toString() !== userId.toString()) {
        const error = new Error('User not authorized to update this transaction');
        error.status = 401;
        throw error;
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        id, 
        updates, 
        { new: true, runValidators: true }
    );

    return updatedTransaction;
};

export const removeTransaction = async (id, userId) => {
    if (isDummyMode()) {
        const deletedTx = await deleteDummyTransaction(id, userId);
        
        if (!deletedTx) {
            const error = new Error('Dummy transaction not found or not authorized');
            error.status = 404;
            throw error;
        }
        return true;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Transaction not found (Invalid ID)');
        error.status = 404;
        throw error;
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
        const error = new Error('Transaction not found');
        error.status = 404;
        throw error;
    }

    if (transaction.user.toString() !== userId.toString()) {
        const error = new Error('User not authorized to delete this transaction');
        error.status = 401;
        throw error;
    }

    await Transaction.deleteOne({ _id: transaction._id });
    return true;
};