import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Имя должно быть минимум 3 символа').isLength({min: 3}),
    body('avatarUrl', 'Некорректная ссылка').optional().isURL(),
]
export const postCreateValidation = [
    body('title', 'Введите').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('description', 'Опишите потеряшку (минимум 100 символов)').isLength({min: 100}),
    
]