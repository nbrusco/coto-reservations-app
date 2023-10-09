import { reservationService, userService } from '../services/services.js'

export const getReservation = async (req, res) => {
  try {
    const { rid } = req.params

    if (!rid) {
      return res.status(400).send({
        status: 'error',
        error: 'Valores incompletos'
      })
    }

    const reservation = await reservationService.getReservation(rid)

    if (!reservation) {
      return res.status(404).send({
        status: 'error',
        error: 'No se encontró la reserva'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: reservation
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

export const getReservations = async (req, res) => {
  try {
    const reservations = await reservationService.getReservations()

    if (!reservations) {
      return res.status(404).send({
        status: 'error',
        error: 'No se encontraron reservas'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: reservations
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

export const getReservationsByEmail = async (req, res) => {
  try {
    const { email } = req.params

    if (!email) {
      return res.status(400).send({
        status: 'error',
        error: 'Valores incompletos'
      })
    }

    const reservations = await reservationService.getReservationsByEmail(email)

    if (!reservations) {
      return res.status(404).send({
        status: 'error',
        error: 'No se encontraron reservas para dicho usuario'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: reservations
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

export const getOccupiedDates = async (req, res) => {
  try {
    const occupiedDates = await reservationService.getOccupiedDates()

    if (!occupiedDates) {
      return res.status(404).send({
        status: 'error',
        error: 'No se encontraron reservas'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: occupiedDates
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

export const appointReservation = async (req, res) => {
  try {
    const reservation = req.body
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).send({
        status: 'error',
        error: 'Error al obtener token de autorización'
      })
    }

    const { email, name } = await userService.decodeUser(token)

    if (!email || !reservation || !name) {
      return res.status(400).send({
        status: 'error',
        error: 'Valores incompletos'
      })
    }

    const appointedReservation = await reservationService.appointReservation(
      reservation,
      email,
      name
    )

    if (!appointedReservation) {
      return res.status(404).send({
        status: 'error',
        error: 'Error al realizar reserva'
      })
    }

    res.status(201).send({ status: 'success', payload: appointedReservation })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

export const updateReservation = async (req, res) => {
  try {
    const updateReserv = req.body
    const updateId = req.params.rid
    const token = req.headers.authorization

    if (!updateReserv || !updateId) {
      return res.status(400).send({
        status: 'error',
        error: 'Valores incompletos'
      })
    }

    updateReserv?._id ? delete updateReserv._id : null

    const { email, role } = await userService.decodeUser(token)

    const updatedReservation = await reservationService.updateReservation(
      updateId,
      updateReserv,
      email,
      role
    )

    if (!updatedReservation) {
      return res.status(404).send({
        status: 'error',
        error: 'Error al actualizar reserva'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: updatedReservation
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}

export const deleteReservation = async (req, res) => {
  try {
    const deleteId = req.params.rid
    const reason = req.headers['x-reason']
    const token = req.headers.authorization

    if (!token) {
      return res.status(400).send({
        status: 'error',
        error: 'Error al obtener token de autorización'
      })
    }

    if (!deleteId) {
      return res.status(400).send({
        status: 'error',
        error: 'Valores incompletos'
      })
    }

    const { email, role } = await userService.decodeUser(token)

    const deletedReservation = await reservationService.deleteReservation(
      deleteId,
      reason,
      email,
      role
    )

    if (!deletedReservation || deletedReservation.deletedCount === 0) {
      return res.status(404).send({
        status: 'error',
        error: 'Error al eliminar reserva. Intente nuevamente'
      })
    }

    return res.status(200).send({
      status: 'success',
      payload: deletedReservation
    })
  } catch (error) {
    console.error(`${error}`)
    return res.status(500).send({ status: 'error', error: `${error}` })
  }
}
