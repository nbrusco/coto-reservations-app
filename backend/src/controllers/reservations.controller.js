import { reservationService } from "../services/services.js";
import { userService } from "../services/services.js";

export const getReservation = async (req, res) => {
  try {
    const { rid } = req.params;

    if (!rid) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const reservation = await reservationService.getReservation(rid);

    if (!reservation) {
      return res.status(404).send({
        status: "error",
        error: "No se encontró la reserva",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: reservation,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getReservations();

    if (!reservations) {
      return res.status(404).send({
        status: "error",
        error: "No se encontraron reservas",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: reservations,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const getReservationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const reservations = await reservationService.getReservationsByEmail(email);

    if (!reservations) {
      return res.status(404).send({
        status: "error",
        error: "No se encontraron reservas para dicho usuario",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: reservations,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const appointReservation = async (req, res) => {
  try {
    const { date, type, guests, commentaries } = req.body;
    const token = req.headers.authorization.split(' ')[1]
    const { email } = await userService.decodeUser(token);

    if (!token) {
      return res.status(400).send({
        status: "error",
        error: "Error al obtener token de autorización",
      });
    }

    if (!email || !date || !type || !guests) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const appointedReservation = await reservationService.appointReservation(
      email,
      date,
      type,
      guests,
      commentaries
    );

    if (!appointedReservation) {
      return res.status(404).send({
        status: "error",
        error: "Error al realizar reserva",
      });
    }

    res.status(201).send({ status: "success", payload: appointedReservation });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const updateReserv = req.body;
    const updateId = req.params.rid;

    if (!updateReserv || !updateId) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const updatedReservation = await reservationService.updateReservation(
      updateId,
      updateReserv
    );

    if (!updatedReservation) {
      return res.status(404).send({
        status: "error",
        error: "Error al actualizar reserva",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: updatedReservation,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deleteId = req.params.rid;

    if (!deleteId) {
      return res.status(400).send({
        status: "error",
        error: "Valores incompletos",
      });
    }

    const deletedReservation = await reservationService.deleteReservation(
      deleteId
    );

    if (!deletedReservation) {
      return res.status(404).send({
        status: "error",
        error: "Error al eliminar reserva",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: deletedReservation,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).send({ status: "error", error: `${error}` });
  }
};
