const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.index = async(req, res, next) =>{
    const users = await User.find();

    return res.json({users})
}
exports.create = async(req, res,next) => {

        const {name, email, password, confirmPassword} = req.body

        if (!name) {
            res.status(422).json({error: "nome é obrigatório"})
        }
        if (!email) {
            res.status(422).json({error: "email é obrigatório"})
        }
        if (!password) {
            res.status(422).json({error: "senha é obrigatório"})
        }
        if (password !== confirmPassword) {
            res.status(422).json({error: "as senhas nao batem"})
        }

        const userExists = await User.findOne({email})

        if (userExists) {
            res.json({error: 'Por favor, utilize outro email'})
        }
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt)

        const user = new User({
            name,
            email,
            password:passwordHash,
        });
        try {
            await user.save();

            res.status(201).json({user: user});
        }catch(error){
            return res.status(500).json({msg:"erro no servidor,tente novamente!"})
        }
        return res.json({msg: userCreated})
}

