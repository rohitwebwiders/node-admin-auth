const Admin = require('../models/Admin');

class AdminRepository {

    async findByEmail(email) {
        return await Admin.findOne({
            where: { email }
        });
    }

}

module.exports = new AdminRepository();