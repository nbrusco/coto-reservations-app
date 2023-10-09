import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'

import { userService } from '../services/services.js'

import { createHash } from '../utils.js'
import { config } from '../config/config.js'

const {
  jwt: { JWT_SECRET }
} = config

const LocalStrategy = local.Strategy
const JwtStrategy = jwt.Strategy
const extractJwt = jwt.ExtractJwt

const jwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
}

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email'
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body

          const userExists = await userService.checkExistingUser(username)

          if (userExists) {
            console.log('User already exists')
            return done(null, false)
          }

          const newUser = {
            first_name,
            last_name,
            email: username,
            age,
            password: createHash(password)
          }

          const result = await userService.registerUser(newUser)

          return done(null, result)
        } catch (error) {
          return done(null, false)
        }
      }
    )
  )

  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload)
      } catch (error) {
        return done(error)
      }
    })
  )
}

export default initializePassport
