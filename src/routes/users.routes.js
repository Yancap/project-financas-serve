const { Router } = require('express')
const usersRoutes = Router()

const UsersController = require('../controller/UsersController')
const authToken = require('../middleware/authToken')
const userController = new UsersController

usersRoutes.post('/register', userController.create)
usersRoutes.post('/login', authToken, userController.show)

module.exports = usersRoutes