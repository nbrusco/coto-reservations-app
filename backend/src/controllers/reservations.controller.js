import { reservationService } from "../services/services.js";

export const getReservation = async (req, res) => {
  try {
    const { rid } = req.params;

    if (!rid) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const reservation = await reservationService.getReservation(rid);

    if (!reservation) {
      return res.status(404).send({
        status: "error",
        error: "Reservation not found",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: reservation,
    });
  } catch (error) {
    console.error(`Cannot get reservation with mongoose ${error}`);
    return res.status(500).send({
      status: "error",
      error: "Failed to get reservation",
    });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getReservations();

    if (!reservations) {
      return res.status(404).send({
        status: "error",
        error: "Reservations not found",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: reservations,
    });
  } catch (error) {
    console.error(`Cannot get reservations with mongoose ${error}`);
    return res.status(500).send({
      status: "error",
      error: "Failed to get reservations",
    });
  }
};

export const getReservationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const reservations = await reservationService.getReservationsByEmail(email);

    if (!reservations) {
      return res.status(404).send({
        status: "error",
        error: "Reservations not found",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: reservations,
    });
  } catch (error) {
    console.error(`Cannot get reservations with mongoose ${error}`);
    return res.status(500).send({
      status: "error",
      error: "Failed to get reservations",
    });
  }
};

export const appointReservation = async (req, res) => {
  try {
    const { email, date, type, guests, commentaries } = req.body;
    const { jwtCookie: token } = req.cookies;

    if (!token) {
      return res.status(400).send({
        status: "error",
        error: "Failed to get token",
      });
    }

    if (!email || !date || !type || !guests) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
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
        error: "Failed to appoint reservation",
      });
    }

    res.status(201).send({ status: "success", payload: appointedReservation });
  } catch (error) {
    console.error(`Cannot appoint reservation with mongoose ${error}`);
    return res.status(500).send({
      status: "error",
      error: "Failed to appoint reservation",
    });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const updateReserv = req.body;
    const updateId = req.params.rid;

    if (!updateReserv || !updateId) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const updatedReservation = await reservationService.updateReservation(
      updateId,
      updateReserv
    );

    if (!updatedReservation) {
      return res.status(404).send({
        status: "error",
        error: "Failed to update reservation",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: updatedReservation,
    });
  } catch (error) {
    console.error(`Cannot update reservation with mongoose ${error}`);
    return res.status(500).send({
      status: "error",
      error: "Failed to update reservation",
    });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const deleteId = req.params.rid;

    if (!deleteId) {
      return res.status(400).send({
        status: "error",
        error: "Incomplete values",
      });
    }

    const deletedReservation = await reservationService.deleteReservation(
      deleteId
    );

    if (!deletedReservation) {
      return res.status(404).send({
        status: "error",
        error: "Failed to delete reservation",
      });
    }

    return res.status(200).send({
      status: "success",
      payload: deletedReservation,
    });
  } catch (error) {
    console.error(`Cannot delete reservation with mongoose ${error}`);
    return res.status(500).send({
      status: "error",
      error: "Failed to delete reservation",
    });
  }
};
