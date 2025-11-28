import express from 'express';
import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { createTransactionSchema, updateTransactionSchema } from '../validators/transactionValidator.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTransactions)
    .post(validateRequest(createTransactionSchema), addTransaction);

router.route('/:id')
    .put(validateRequest(updateTransactionSchema), updateTransaction)
    .delete(deleteTransaction);

export default router;