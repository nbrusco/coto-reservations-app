import { reservationModel } from './models/reservations.model.js'

class Reservation {
  constructor () {}

  getReservation = async (query) => {
    try {
      const reservation = await reservationModel.findOne({ _id: query })
      return reservation
    } catch (error) {
      console.error(error)
    }
  }

  getReservations = async () => {
    try {
      const reservations = await reservationModel.find()
      return reservations
    } catch (error) {
      console.error(error)
    }
  }

  getReservationsByEmail = async (email) => {
    try {
      const reservations = await reservationModel.find({ email })
      return reservations
    } catch (error) {
      console.error(error)
    }
  }

  appointReservation = async (reservation) => {
    try {
      const newReservation = await reservationModel.create(reservation)
      return newReservation
    } catch (error) {
      console.error(error)
    }
  }

  updateReservation = async (query, update) => {
    try {
      const updatedReservation = await reservationModel.updateOne(
        { _id: query },
        update
      )
      return updatedReservation
    } catch (error) {
      console.error(error)
    }
  }

  deleteReservation = async (deleteId) => {
    try {
      const deletedReservation = await reservationModel.deleteOne({
        _id: deleteId
      })
      return deletedReservation
    } catch (error) {
      console.error(error)
    }
  }
}

export const reservationDao = new Reservation()
