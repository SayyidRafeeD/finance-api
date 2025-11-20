import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';
import {
    getDummyTransactions,
    addDummyTransaction,
    deleteDummyTransaction
} from '../data/dummyData.js';

const buildQuery = (userId, type) => {
    const query = { user: userId };
    if (type) {
        query.type = type;
    }
    return query;
};

export const findTransactions = async (userId, type) => {
    if (process.env.DATA_MODE === 'dummy') {
        return getDummyTransactions(userId, type);
    }

    const query = buildQuery(userId, type);
    return await Transaction.find(query);
};

export const createTransaction = async (data) => {
    if (process.env.DATA_MODE === 'dummy') {
        return addDummyTransaction({ ...data, user: data.user }); 
    }

    const transaction = new Transaction(data);
    return await transaction.save();
};

export const removeTransaction = async (id, userId) => {
    if (process.env.DATA_MODE === 'dummy') {
        const deletedTx = await deleteDummyTransaction(id, userId);
        if (!deletedTx) {
            const error = new Error('Dummy transaction not found or not authorized');
            error.status = 404;
            throw error;
        }
        return true;
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Transaction not found');
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