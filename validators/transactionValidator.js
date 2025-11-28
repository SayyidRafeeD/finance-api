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

export const updateTransactionSchema = Joi.object({
    text: Joi.string().trim().messages({
        'string.empty': 'Text transaksi tidak boleh kosong'
    }),
    amount: Joi.number().messages({
        'number.base': 'Amount harus berupa angka'
    }),
    type: Joi.string().valid(...Object.values(TRANSACTION_TYPES)).messages({
        'any.only': `Type harus berupa ${Object.values(TRANSACTION_TYPES).join(' atau ')}`
    })
}).min(1).messages({
    'object.min': 'Minimal harus ada satu data yang diupdate (text, amount, atau type)'
});