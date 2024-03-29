const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.client = new MongoLib();
  }

  async getUser({ email }) {
    const user = await this.client.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUserId = await this.client.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });
    return createdUserId;
  }
}

module.exports = UsersService;
