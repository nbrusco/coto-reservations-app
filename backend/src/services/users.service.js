import jwt from "jsonwebtoken";

import { userDao } from "../dao/mongo/user.mongo.js";
import UserDTO from "../dao/dtos/user.dto.js";

import { createHash, isValidPassword } from "../utils.js";
import { config } from "../config/config.js";

const {
  jwt: { JWT_SECRET },
} = config;

export default class UserService {
  constructor() {}

  async getUser(email) {
    try {
      const user = await userDao.getUser({ email });
      if (!user) throw new Error(`User with email ${email} does not exist`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkExistingUser(email) {
    try {
      const user = await userDao.getUser({ email });
      if (user) throw new Error(`User with email ${email} already exists`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  loginUser(user, rememberMe) {
    try {
      const userDTO = new UserDTO(user);
      const jwtUser = JSON.parse(JSON.stringify(userDTO));

      const expireTime = rememberMe ? "7d" : "3h";

      const token = jwt.sign(jwtUser, JWT_SECRET, {
        expiresIn: expireTime,
      });
      if (!token) throw new Error("Auth token signing failed");

      return token;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(newUser) {
    try {
      const user = await userDao.registerUser(newUser);
      if (!user) throw new Error("Error trying to create user");

      const userDTO = new UserDTO(user);
      const { email, name, role } = userDTO;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  passwordValidate(user, password) {
    return isValidPassword(user, password);
  }

  async updatePassword(token, password) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      });
      const { email } = decodedToken;
      if (Date.now() / 1000 > decodedToken.exp) {
        throw new Error("Token has expired. Request another restore link.");
      }

      const user = await userDao.getUser({ email });
      const samePass = this.passwordValidate(user, password);
      if (samePass) {
        throw new Error("Password must be different from the actual one.");
      }

      const hashedPassword = createHash(password);
      if (!hashedPassword) throw new Error("Password hashing failed");

      const passwordUpdate = await userDao.updateUser(
        { email },
        { password: hashedPassword }
      );
      if (!passwordUpdate) {
        throw new Error(`Password update failed for ${email}`);
      }
      return passwordUpdate;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(uid) {
    try {
      const deletedUser = await userDao.deleteUser(uid);
      if (!deletedUser) throw new Error(`Error deleting user ${uid}`);

      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  updateConnection(email) {
    try {
      const connection_updated = userDao.updateUser(
        { email },
        { last_connection: new Date() }
      );
      if (!connection_updated)
        throw new Error("Error updating user's last connection");

      return connection_updated;
    } catch (error) {
      throw error;
    }
  }

  async decodeUser(token) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET, {
        ignoreExpiration: true,
      });
      return decodedToken;
    } catch (error) {
      throw error;
    }
  }
}
