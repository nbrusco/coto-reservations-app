import { v4 as uuidv4 } from "uuid";

import { reservationDao } from "../dao/mongo/reservation.mongo.js";
import { userDao } from "../dao/mongo/user.mongo.js";
import UserDTO from "../dao/dtos/user.dto.js";

import { emailTemplates } from "../mail/templates.js";

export default class ReservationService {
  constructor(mailService) {
    this.mailService = mailService;
  }

  async getReservation(code) {
    try {
      const reservation = await reservationDao.getReservation(code);
      if (!reservation) throw new Error("No se encontró la reserva");

      return reservation;
    } catch (error) {
      throw error;
    }
  }

  async getReservations() {
    try {
      const reservations = await reservationDao.getReservations();
      if (!reservations) throw new Error("No se encontraron reservas");

      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async getReservationsByEmail(email) {
    try {
      const reservations = await reservationDao.getReservationsByEmail(email);
      if (!reservations.length)
        throw new Error(`No se encontraron reservas de ${email}`);

      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async appointReservation(email, date, type, guests, commentaries) {
    try {
      const user = await userDao.getUser({ email });
      if (!user) throw new Error("No se encontró el usuario");

      const userDTO = new UserDTO(user);
      const { name } = userDTO;

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
        throw new Error(`No se pudo realizar la reserva. Intente nuevamente`);

      const mail = {
        to: email,
        subject: `${name}, tu Reserva realizada en Z!`,
        html: emailTemplates.reservationEmail(name, email, date, type, code, guests, commentaries),
      };

      await this.mailService.sendEmail(mail);

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
        throw new Error(
          `No se pudo actualizar la reserva ${updateId}. Intente nuevamente`
        );
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
        throw new Error(
          `No se pudo eliminar la reserva ${updateId}. Intente nuevamente`
        );
      }

      return deletedReservation;
    } catch (error) {
      throw error;
    }
  }
}
