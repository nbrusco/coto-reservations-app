import { userService } from "../services/services.js";

export const registerUser = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "success", message: "Usuario registrado" });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const failRegister = async (req, res) => {
  return res
    .status(409)
    .send({ status: "error", error: "El usuario ya existe" });
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const user = await userService.getUser(email);

    if (!user) {
      return res
        .status(401)
        .send({ status: "error", error: "Credenciales inválidas." });
    }

    if (!userService.passwordValidate(user, password)) {
      return res
        .status(401)
        .send({ status: "error", error: "Credenciales inválidas." });
    }

    const token = userService.loginUser(user, rememberMe);

    if (!token) {
      return res.status(500).send({
        status: "error",
        error: "Error al generar el token de autorización",
      });
    }

    const last_connection = userService.updateConnection(email);

    if (!last_connection) {
      return res.status(500).send({
        status: "error",
        error: "Error al actualizar la última conexión",
      });
    }

    return res.send({
      status: "success",
      message: "Logueo correcto",
      token: token,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const logoutUser = async (req, res) => {
  const token = req.headers.authorization;
  const { email } = await userService.decodeUser(token);
  const last_connection = userService.updateConnection(email);

  if (!last_connection) {
    return res.status(500).send({
      status: "error",
      error: "Error al actualizar la última conexión",
    });
  }
  return res.send({ status: "success", message: "Deslogueo correcto" });
};

export const updatePassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const passwordUpdate = await userService.updatePassword(token, password);

    if (!passwordUpdate) {
      return res
        .status(500)
        .send({ status: "error", error: "Error al actualizar contraseña" });
    }

    return res.status(200).send({
      status: "success",
      message: "Contraseña actualizada",
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const restorePasswordProcess = async (req, res) => {
  try {
    const { email } = req.body;
    const domain = req.get("host");

    if (!email) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    await userService.restorePasswordProcess(email, domain);

    return res.status(200).send({
      status: "success",
      message: "Correo de reestablecimiento enviado",
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const getUserWithToken = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const data = await userService.decodeUser(token);

    if (!data) {
      return res.status(404).send({
        status: "error",
        error: `Error obteniendo datos de usuario`,
      });
    }

    return res.status(200).send({
      status: "success",
      payload: data,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};
