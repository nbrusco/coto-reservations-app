import { v4 as uuidv4 } from "uuid";

import { reservationDao } from "../dao/mongo/reservation.mongo.js";

export default class ReservationService {
  constructor() {}

  async getReservation(code) {
    try {
      const reservation = await reservationDao.getReservation(code);
      if (!reservation) throw new Error("No reservation found");

      return reservation;
    } catch (error) {
      throw error;
    }
  }

  async getReservations() {
    try {
      const reservations = await reservationDao.getReservations();
      if (!reservations) throw new Error("No reservations found");

      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async getReservationsByEmail(email) {
    try {
      const reservations = await reservationDao.getReservationsByEmail(email);
      if (!reservations.length) throw new Error(`No reservations found for ${email}`);

      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async appointReservation(email, date, type, guests, commentaries) {
    try {
      const code = uuidv4();
      const createdAt = new Date();

      const reservation = {
        email,
        date,
        createdAt,
        type,
        guests,
        code,
        commentaries,
      };

      const newReservation = await reservationDao.appointReservation(
        reservation
      );
      if (!newReservation)
        throw new Error(`Error appointing reservation with given data`);

      return newReservation;
    } catch (error) {
      throw error;
    }
  }

  async updateReservation(updateId, updateReserv) {
    try {
      const updatedReservation = await reservationDao.updateReservation(
        updateId,
        updateReserv
      );

      if (!updatedReservation) {
        throw new Error(`Error updating reservation with code: ${updateId}`);
      }

      return updatedReservation;
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(deleteId) {
    try {
      const deletedReservation = await reservationDao.deleteReservation(
        deleteId
      );
      if (!deletedReservation) {
        throw new Error(`Error deleting reservation with code: ${deleteId}`);
      }

      return deletedReservation;
    } catch (error) {
      throw error;
    }
  }
}
