import Joi from 'joi';
import { TRANSACTION_TYPES } from '../utils/constants.js';

export const createTransactionSchema = Joi.object({
    text: Joi.string().trim().required().messages({
        'string.empty': 'Text transaksi tidak boleh kosong',
        'any.required': 'Text transaksi wajib diisi'
    }),
    amount: Joi.number().required().messages({
        'number.base': 'Amount harus berupa angka',
        'any.required': 'Amount wajib diisi'
    }),
    type: Joi.string().valid(...Object.values(TRANSACTION_TYPES)).required().messages({
        'any.only': `Type harus berupa ${Object.values(TRANSACTION_TYPES).join(' atau ')}`,
        'any.required': 'Type wajib diisi'
    })
});