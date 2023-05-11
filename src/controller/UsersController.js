const knexConnection = require('../database')
const { hash, compare } = require("bcryptjs")
const { sign } = require('jsonwebtoken')
const config = require('../config')

 class UsersController{
    async create(request, response){
        const {name, email, password} = request.body
        const hashPassword = await hash(password, 8)
        const compare = await knexConnection('users').where({email}).first()
        if (compare){
            return response.json({error: "Email Existente"})
        }
        const data = {
            name, 
            email,
            password: hashPassword
        }
        try{
          await knexConnection('users').insert(data)  
          return response.json({message: 'OK'})
        } catch(err){
            return response.json({error: err})
        }
        
    }
    async show(request, response){
        const {email, password, user_id: id } = request.body
        console.log("request.body",request.body);
        if (id) {
            const { token } = request.body
            console.log("Tem ID: ", token);
            const data = await knexConnection('users').where({id}).first()
            return response.json({
                message: 'OK',
                name: data.name,
                token: token
            })
        } else {
            const data = await knexConnection('users').where({email}).first()
            console.log("Dados: " + data);
            if (!data || !(await compare(password, data.password))) {
                return response.json({error: "Email Senha ou Email Incorreto"})
            }
            const { secret, expiresIn } = config.jwt
            const token = sign({}, secret, {
                subject: String(data.id),
                expiresIn
            })
            return response.json({
                message: 'OK',
                name: data.name,
                token: token
            })
        }

        

    }
}

module.exports = UsersController