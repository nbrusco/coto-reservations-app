import UserService from './users.service.js'
import ReservationService from './reservations.service.js'

import NodemailerService from '../mail/nodemailer.js'
const mailService = new NodemailerService()

export const userService = new UserService(mailService)
export const reservationService = new ReservationService(mailService)
