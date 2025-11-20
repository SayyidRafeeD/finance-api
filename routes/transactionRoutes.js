import express from 'express';
import {
    getTransactions,
    addTransaction,
    deleteTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { createTransactionSchema } from '../validators/transactionValidator.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTransactions)
    .post(validateRequest(createTransactionSchema), addTransaction); // Pasang validator di sini

router.route('/:id')
    .delete(deleteTransaction);

export default router;