const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const { loginValidation, updateProfileValidation, forgotPasswordValidation } = require('../validations/AuthValidation');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post(
    '/login',
    loginValidation,
    AuthController.login
);
router.put('/profile/update',
    authMiddleware,
    updateProfileValidation,
    AuthController.updateProfile
);
router.post('/forgot-password',
    forgotPasswordValidation,
    AuthController.forgotPassword
)

module.exports = router;