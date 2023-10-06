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
      if (!user) throw new Error(`El usuario ${email} no existe`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkExistingUser(email) {
    try {
      const user = await userDao.getUser({ email });
      if (user) throw new Error(`El usuario ${email} ya existe`);
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
      if (!token) throw new Error("Falló la firma del token de autorización");

      return token;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(newUser) {
    try {
      const user = await userDao.registerUser(newUser);
      if (!user) throw new Error("Error en la creación del usuario");

      const userDTO = new UserDTO(user);
      // const { email, name, role } = userDTO;

      return user;
    } catch (error) {
      throw error;
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
        throw new Error(
          "El token expiró, solicita otro enlace de recuperación."
        );
      }

      const user = await userDao.getUser({ email });
      const samePass = this.passwordValidate(user, password);
      if (samePass) {
        throw new Error("La contraseña debe ser distinta a la actual.");
      }

      const hashedPassword = createHash(password);
      if (!hashedPassword) throw new Error("Falló el cifrado de la contraseña");

      const passwordUpdate = await userDao.updateUser(
        { email },
        { password: hashedPassword }
      );
      if (!passwordUpdate) {
        throw new Error(
          `Falló la actualización de la contraseña para ${email}`
        );
      }
      return passwordUpdate;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(uid) {
    try {
      const deletedUser = await userDao.deleteUser(uid);
      if (!deletedUser) throw new Error(`Error borrando el usuario ${uid}`);

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
        throw new Error("Error actualizando la última conexión del usuario");

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
