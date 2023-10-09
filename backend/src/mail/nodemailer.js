import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

const {
  mailing: { EMAIL_SERVICE, EMAIL_PORT, EMAIL_USER, EMAIL_PASS }
} = config

export default class NodemailerService {
  constructor () {
    this.transport = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    })
  }

  sendEmail = async ({ to, subject, html, attachments = [] }) => {
    try {
      const sentEmail = await this.transport.sendMail({
        from: `Z! Juegos ${EMAIL_USER}`,
        to,
        subject,
        html,
        attachments
      })
      if (!sentEmail) throw new Error('Error al enviar email')

      return sentEmail
    } catch (error) {
      throw error
    }
  }
}
