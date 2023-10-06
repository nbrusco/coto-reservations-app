import { config } from "../config/config.js";

import { userService } from "../services/services.js";

const {
  jwt: { COOKIE_NAME },
} = config;

export const registerUser = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "User registered" });
  } catch (error) {
    console.error(`Failed to register user: ${error}`);
    return res
      .status(500)
      .send({ status: "error", error: "Failed to register user" });
  }
};

export const failRegister = async (req, res) => {
  return res
    .status(409)
    .send({ status: "error", error: "User already exists" });
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const user = await userService.getUser(email);

    if (!user) {
      return res
        .status(401)
        .send({ status: "error", error: "Invalid credentials." });
    }

    if (!userService.passwordValidate(user, password)) {
      return res
        .status(401)
        .send({ status: "error", error: "Invalid credentials." });
    }

    const token = userService.loginUser(user, rememberMe);

    if (!token) {
      return res
        .status(500)
        .send({ status: "error", error: "Failed to generate JWT token" });
    }

    const last_connection = userService.updateConnection(email);

    if (!last_connection) {
      return res
        .status(500)
        .send({ status: "error", error: "Failed to update last connection" });
    }

    return res
      .cookie(COOKIE_NAME, token, { httpOnly: true })
      .send({ status: "success", message: "Logged In" });
  } catch (error) {
    console.error(`Failed to login with error: ${error}`);
    return res.status(500).send({ status: "error", error: "Login failed" });
  }
};

export const logoutUser = async (req, res) => {
  const { jwtCookie: token } = req.cookies;
  const { email } = await userService.decodeUser(token);
  const last_connection = userService.updateConnection(email);

  if (!last_connection) {
    console.error("Failed to update last connection");
    return res
      .status(500)
      .send({ status: "error", error: "Failed to update last connection" });
  }
  return res
    .clearCookie(COOKIE_NAME)
    .send({ status: "success", message: "Logout successful!" });
};

export const updatePassword = async (req, res) => {
    try {
      const { password, token } = req.body
  
      if (!password || !token) {
        return res.status(400).send({
          status: 'error',
          error: 'Incomplete values'
        })
      }
  
      const passwordUpdate = await userService.updatePassword(token, password)
  
      if (!passwordUpdate) {
        return res
          .status(500)
          .send({ status: 'error', error: 'Failed to update password' })
      }
  
      return res.status(200).send({
        status: 'success',
        message: 'Successfully updated password'
      })
    } catch (error) {
      console.error(`Failed to restore user password: ${error}`)
      return res.status(500).send({ status: 'error', error: `${error}` })
    }
  }