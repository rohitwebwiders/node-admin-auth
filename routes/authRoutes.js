const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const { loginValidation, updateProfileValidation } = require('../validations/AuthValidation');
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

module.exports = router;