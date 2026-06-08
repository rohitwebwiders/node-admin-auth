const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminRepository = require('../repositories/AdminRepository');

class AuthService {

    async login(email, password) {

        const admin = await AdminRepository.findByEmail(email);

        if (!admin) {
            throw new Error('Invalid credentials');
        }
        
        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password
        );
        console.log('Request Password:', password);
        console.log('DB Hash:', admin.password);
        console.log('Password Match:', isPasswordValid);


        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        return {
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        };
    }
    async updateProfile(adminId, name, email, currentPassword, newPassword) {
        const admin = await AdminRepository.findById(adminId);
        if (!admin) {
            throw new Error('Invalid credentials');
        }
        if (!bcrypt.compare(currentPassword, admin.password)) {
            throw new Error('Invalid password');
        }
        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            admin.password
        );
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await AdminRepository.updateProfile(admin.id, name, email, encryptedPassword);
    }

}

module.exports = new AuthService();