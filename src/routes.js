const express = require('express');
const UserController = require('./controller/UserController')

const routes = express.Router()


routes.get('/users',UserController.index)
routes.post('/register',UserController.create)

module.exports = routes;
