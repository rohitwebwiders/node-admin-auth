const { validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');

class AuthController {

    async login(req, res) {

        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { email, password } = req.body;

            const response = await AuthService.login(
                email,
                password
            );

            return res.json({
                success: true,
                message: 'Login successful',
                data: response
            });

        } catch (error) {

            return res.status(401).json({
                success: false,
                message: error.message
            });

        }

    }

    async updateProfile(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    success: false,
                    errors: errors.array()
                });
            }
            const { name, email, currentPassword, newPassword } = req.body;
            const { id } = req.user;
            const response = await AuthService.updateProfile(
                id,
                name,
                email,
                currentPassword,
                newPassword
            );
            return res.json({
                success: true,
                message: 'Profile updated successfully',
                data: response
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = new AuthController();