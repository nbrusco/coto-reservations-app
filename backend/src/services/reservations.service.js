import { v4 as uuidv4 } from "uuid";
import { reservationDao } from "../dao/mongo/reservation.mongo.js";
import { emailTemplates } from "../mail/templates.js";

export default class ReservationService {
  constructor(mailService) {
    this.mailService = mailService;
  }

  formatDate(date) {
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const dateAndTime = new Date(date);
    const dateFormat = dateAndTime.toLocaleDateString("es-AR", dateOptions);

    const adjustedTime = new Date(
      dateAndTime.getTime() + dateAndTime.getTimezoneOffset() * 60 * 1000
    );
    const timeFormat = adjustedTime.toLocaleTimeString("es-AR", timeOptions);

    return `${dateFormat} a las ${timeFormat}hs`;
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

      if (!reservations)
        throw new Error(`No se encontraron reservas de ${email}`);

      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async appointReservation(reservation, email, name) {
    try {
      const code = uuidv4();
      const createdAt = new Date();
      const dateAndTime = new Date(`${reservation.date}T${reservation.time}Z`);

      reservation.date = dateAndTime;
      reservation.code = code;
      reservation.createdAt = createdAt;
      reservation.email = email;
      reservation.name = name;

      const newReservation = await reservationDao.appointReservation(
        reservation
      );

      if (!newReservation)
        throw new Error(`No se pudo realizar la reserva. Intente nuevamente`);

      const formattedDate = this.formatDate(reservation.date);

      const mail = {
        to: email,
        subject: `${name}, tu Reserva realizada en Z!`,
        html: emailTemplates.reservationEmail(reservation, formattedDate),
      };

      await this.mailService.sendEmail(mail);

      return newReservation;
    } catch (error) {
      throw error;
    }
  }

  async updateReservation(updateId, newReservation, email, role) {
    try {
      const oldReservation = await reservationDao.getReservation(updateId);
      const oldFormattedDate = this.formatDate(oldReservation.date);

      const dateAndTime = new Date(
        `${newReservation.date}T${newReservation.time}Z`
      );
      newReservation.date = dateAndTime;

      const newFormattedDate = this.formatDate(newReservation.date);

      if (role === "user" && email !== oldReservation.email) {
        throw new Error("Solo puede editar sus propias reservaciones");
      }

      const updatedReservation = await reservationDao.updateReservation(
        updateId,
        newReservation
      );

      if (!updatedReservation) {
        throw new Error(
          `No se pudo actualizar la reserva ${updateId}. Intente nuevamente`
        );
      }

      const mail = {
        to: oldReservation.email,
        subject: "Notificación de Modificación de Reserva en Z! Juegos",
        html: emailTemplates.reservationUpdateEmail(
          oldReservation,
          newReservation,
          oldFormattedDate,
          newFormattedDate
        ),
      };

      await this.mailService.sendEmail(mail);

      return updatedReservation;
    } catch (error) {
      throw error;
    }
  }

  async deleteReservation(deleteId, reason, role, email) {
    try {
      const reservation = await reservationDao.getReservation(deleteId);

      if (role === "user" && email !== reservation.email) {
        throw new Error("Solo puede eliminar sus propias reservaciones");
      }

      const deletedReservation = await reservationDao.deleteReservation(
        deleteId
      );
      if (!deletedReservation) {
        throw new Error(
          `No se pudo eliminar la reserva ${updateId}. Intente nuevamente`
        );
      }

      const formattedDate = this.formatDate(reservation.date);

      const mail = {
        to: reservation.email,
        subject: "Notificación de Eliminación de Reserva en Z! Juegos",
        html: emailTemplates.reservationDeleteEmail(
          reservation,
          formattedDate,
          reason
        ),
      };

      await this.mailService.sendEmail(mail);

      return deletedReservation;
    } catch (error) {
      throw error;
    }
  }
}
