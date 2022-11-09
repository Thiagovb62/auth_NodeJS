const express = require('express');
const UserController = require('./controller/UserController')

const routes = express.Router()

routes.get('/', function(req, res) {
    res.status(200).json({ msg: 'api inicializada' })
})

routes.post('/user',UserController.create)
module.exports = routes;
