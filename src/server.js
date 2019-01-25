// require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')
const Sentry = require('@sentry/node')
const validate = require('express-validation')
const Youch = require('youch')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV === 'production'
    // this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception() // A ORDEM DE CARREGAMENTO DEVE SER SEGUIDA!
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(
      databaseConfig.uri,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
  }

  middlewares () {
    this.express.use(express.json())
    // this.express.use(Sentry.Handlers.requestHandler())
  }
  routes () {
    this.express.use(require('./routes'))
  }
  // Quando o middleware tem quatro parametros ele serve para tratativa de erros
  exception () {
    if (process.env.NODE_ENV === 'production') {
      // this.express.use(Sentry.Handlers.errorHandler())
    }
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      // Apenas para debug no ambiente interno
      if (process.env.NODE_ENV === 'production') {
        // Não se aplica
        console.log('producao')
      } else {
        console.log('desenvolvimento')
        const youch = new Youch(err, req)
        // O async entrou apenas por causa do Youch
        // return res.send(await youch.toHTML())
        return res.json(await youch.toJSON())
      }

      // Para um erro que nao recebeu um tratamento especifico
      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
