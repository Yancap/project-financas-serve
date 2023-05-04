const { Router } = require('express')
const routes = Router()

const usersRoutes = require('./users.routes')
const transactionRoutes = require('./transaction.routes')

routes.use('/users', usersRoutes)
routes.use('/transactions', transactionRoutes)

module.exports = routes