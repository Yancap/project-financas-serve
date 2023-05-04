const { Router } = require('express')
const transactionsRoutes = Router()

const TransactionController = require('../controller/TransactionController')
const authToken = require('../middleware/authToken')
const transactionController = new TransactionController

transactionsRoutes.post('/create', authToken, transactionController.create)
transactionsRoutes.get('/show', authToken, transactionController.index)
transactionsRoutes.put('/update', authToken, transactionController.update)

module.exports = transactionsRoutes