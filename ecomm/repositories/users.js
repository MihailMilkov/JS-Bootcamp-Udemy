const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    async create({ email, password }) {
        const records = await this.getAll();
        const salt = crypto.randomBytes(8).toString('hex');
        const hashed = await scrypt(password, salt, 64);
        const record = {
            id: this.randomId(), email, password: `${hashed.toString('hex')}.${salt}`
        };
        await this.writeAll([...records, record]);
        return record;
    }

    async comparePasswords(saved, supplied) {
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
        return hashed === hashedSuppliedBuf.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');