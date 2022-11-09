const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const routes = require('./routes')

const app = express();
app.use(express.json());
app.use(routes)

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("conectei no banco de dados");
        app.listen(3000);
    })
    .catch((e) => console.log(e));
