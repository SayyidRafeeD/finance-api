import mongoose from 'mongoose';
import { TRANSACTION_TYPES } from '../utils/constants.js';

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        trim: true,
        required: [true, 'Teks transaksi wajib diisi'],
    },
    amount: {
        type: Number,
        required: [true, 'Jumlah (amount) wajib diisi'],
    },
    type: {
        type: String,
        enum: Object.values(TRANSACTION_TYPES), 
        required: true,
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;