import express from 'express';
import {
    getTransactions,
    addTransaction,
    deleteTransaction
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getTransactions).post(addTransaction);
router.route('/:id').delete(deleteTransaction);


export default router;