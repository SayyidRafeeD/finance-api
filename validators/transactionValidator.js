import Joi from 'joi';

export const createTransactionSchema = Joi.object({
    text: Joi.string().trim().required().messages({
        'string.empty': 'Text transaksi tidak boleh kosong',
        'any.required': 'Text transaksi wajib diisi'
    }),
    amount: Joi.number().required().messages({
        'number.base': 'Amount harus berupa angka',
        'any.required': 'Amount wajib diisi'
    }),
    type: Joi.string().valid('income', 'expense').required().messages({
        'any.only': 'Type harus berupa income atau expense',
        'any.required': 'Type wajib diisi'
    })
});