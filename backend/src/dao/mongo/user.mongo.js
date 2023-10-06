import { userModel } from "./models/users.model.js";

class User {
  constructor() {}

  getUser = async (query) => {
    try {
      const user = await userModel.findOne(query);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  registerUser = async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      console.error(error);
    }
  };

  updateUser = async (query, update) => {
    try {
      const updatedUser = await userModel.updateOne(query, update);
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };

  deleteUser = async (userId) => {
    try {
      const deletedUser = await userModel.deleteOne({ _id: userId });
      return deletedUser;
    } catch (error) {
      console.error(error);
    }
  };
}

export const userDao = new User();
