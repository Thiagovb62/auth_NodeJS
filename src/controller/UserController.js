const mongoose = require('mongoose')
const User = require('../models/User')

exports.create = async(req, res) => {
    const {name, email, password,confirmPassword} = req.body

    if(!name ){
        res.status(422).json({error:"nome é obrigatório"})
    }
    if(!email){
        res.status(422).json({error:"email é obrigatório"})
    }
    if(!password){
        res.status(422).json({error:"senha é obrigatório"})
    }
    if(password !== confirmPassword){
        res.status(422).json({error:"as senhas nao batem"})
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.json({msg:'Por favor, utilize outro email'})
    }

    const  userCreated = await User.create(req.body)

    return res.json({msg:userCreated})
}
