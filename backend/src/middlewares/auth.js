import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

const {
  jwt: { JWT_SECRET }
} = config

export const verifyRole = (req, res, next, rolesToVerify) => {
  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).send({ message: 'No JWT provided' })
  }

  const { role } = jwt.verify(token, JWT_SECRET)

  if (!rolesToVerify.includes(role)) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  next()
}