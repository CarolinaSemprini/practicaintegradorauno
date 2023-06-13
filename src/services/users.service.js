import { UserModel } from "../DAO/models/users.models.js";

class UserService {
  async validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      throw new Error("validation error: all fields are required.");
    }
  }

  async getAll() {
    const users = await UserModel.find({});
    if (users.length === 0) {
      throw new Error("users not found.");
    }
    return users;
  }

  async getOne(_id) {
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("user not found.");
    }
    return user;
  }

  async deleteOne(_id) {
    const deleteUser = await UserModel.findByIdAndDelete(_id);
    if (!deleteUser) {
      throw new Error("user not found.");
    }
    return deleteUser;
  }

  async createOne(body) {
    const { firstName, lastName, email } = body;
    await this.validateUser(firstName, lastName, email);
    const userCreated = await UserModel.create({
      firstName,
      lastName,
      email,
    });
    return userCreated;
  }

  async updateOne(_id, body) {
    const { firstName, lastName, email } = body;
    await this.validateUser(firstName, lastName, email);
    const userUpdated = await UserModel.findByIdAndUpdate(
      _id,
      { firstName, lastName, email },
      { new: true }
    );
    if (!userUpdated) {
      throw new Error("user not found.");
    }
    return userUpdated;
  }
}
export const userService = new UserService();
