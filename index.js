const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const app = express();
app.use(express.json());

app.get('/', function(req, res) {
    res.status(200).json({ msg: 'api inicializada' })
})
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("conectei no banco de dados");
        app.listen(3000);
    })
    .catch((e) => console.log(e));