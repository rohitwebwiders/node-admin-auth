const { body } = require('express-validator');

exports.loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

exports.updateProfileValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    body('newPassword')
        .notEmpty()
        .withMessage('New Password is required'),
    body('confirmNewPassword')
        .notEmpty()
        .withMessage('Confirm new password is required')
        .isLength({ min: 6, max: 50 })
        .withMessage('Password must be between 6 and 50 characters')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
]