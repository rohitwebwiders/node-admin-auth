const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const { loginValidation } = require('../validations/AuthValidation');

router.post(
    '/login',
    loginValidation,
    AuthController.login
);

module.exports = router;