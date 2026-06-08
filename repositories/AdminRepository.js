const Admin = require('../models/Admin');

class AdminRepository {

    async findByEmail(email) {
        return await Admin.findOne({
            where: { email }
        });
    }

    async findById(id) {
        return await Admin.findOne({
            where: { id }
        });
    }

    async updateProfile(id, name, email, newPassword) {
        return await Admin.update({
            name,
            email,
            password: newPassword
        }, {
            where: { id }
        });
    }

}

module.exports = new AdminRepository();