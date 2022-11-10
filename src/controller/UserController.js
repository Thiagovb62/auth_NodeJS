const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.index = async(req, res, next) =>{
    const users = await User.find();

    return res.json({users})
},
exports.create = async(req, res,next) => {

        const {name, email, password, confirmPassword} = req.body

        if (!name) {
            return res.status(422).json({error: "nome é obrigatório"})
        }
        if (!email) {
           return  res.status(422).json({error: "email é obrigatório"})
        }
        if (!password) {
           return  res.status(422).json({error: "senha é obrigatório"})
        }
        if (password !== confirmPassword) {
            return res.status(422).json({error: "as senhas nao batem"})
        }

        const userExists = await User.findOne({email})

        if (userExists) {
          return res.json({error: 'Por favor, utilize outro email'})
        }
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(this.password,salt)

        const user = new User({
            name,
            email,
            passwordHash,
        });
        try {
            await user.save();
            return res.status(201).json({user: user});
        }catch(error){
            return res.status(500).json({msg:"erro no servidor,tente novamente!"})
        }
},
exports.login = async (req,res) => {
    const {email, password} = req.body

    if (!email) {
       return  res.status(422).json({error: "email é obrigatório"})
    }
    if (!password) {
        return res.status(422).json({error: "senha é obrigatório"})
    }
     const user = User.findOne({email:email})

    if(!user){
        return res.json({error: "Usuario nao encotrado"})
    }
    const checkPassword = await bcrypt.compare(password,user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida" });
    }
    console.log(checkPassword)
    try {
        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        );
        return res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
        return res.status(500).json({ msg: error });
    }

}

