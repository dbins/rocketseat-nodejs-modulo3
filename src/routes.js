const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const routes = express.Router()
// const UserController = require('./app/controllers/UserController')
// const SessionController = require('./app/controllers/SessionController')
const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middlewares/auth')
// routes.post('/users', UserController.store)
// routes.post('/sessions', SessionController.store)
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)
routes.get('/teste', authMiddleware, (req, res) => res.json({ ok: true }))
// As rotas a partir daqui exigem autenticacao
routes.use(authMiddleware)

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

routes.get(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
) // Rota errada
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

module.exports = routes
