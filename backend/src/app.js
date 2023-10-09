import express from 'express'
import cowsay from 'cowsay'
import colors from 'colors'

import cors from 'cors'

import routerAPI from './routes/routes.js'

import { config } from './config/config.js'
import initializePassport from './auth/passport.js'
import database from './database/db.js'

const { PORT } = config

const env = async () => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())
  initializePassport()

  database.connect()

  routerAPI(app)

  app.listen(PORT, () =>
    console.log(
      cowsay.say({
        text: `Server up in port ${PORT}!`,
        e: '^^'
      }).rainbow
    )
  )
}

env()
