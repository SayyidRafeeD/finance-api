import Joi from 'joi';

export const registerUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.min': 'Username minimal 3 karakter',
        'string.alphanum': 'Username hanya boleh berisi huruf dan angka',
        'any.required': 'Username wajib diisi'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password minimal 6 karakter',
        'any.required': 'Password wajib diisi'
    })
});

export const loginUserSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'Username wajib diisi'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password wajib diisi'
    })
});