const knexConnection = require('../database')

class TransactionController{
    async index(request, response){
        const { user_id: id } = request.body
        const transactions = await knexConnection('transactions').where('user_id', id)
        return response.json(transactions)
    }
    async create(request, response){
        const {title, type, amount, category, user_id: id} = request.body
        await knexConnection('transactions').insert({ user_id: id, title, type, amount, category})
        return response.json({message: 'OK'})
    }
    async update(request, response){
        const { id, user_id, title, type, amount, category} = request.body
        try {
           await knexConnection('transactions').where({user_id, id}).update({ title, type, amount, category}) 
        } catch (error) {
            return response.json({error: true, message: error})
        }
        return response.json({message: 'OK'})
    }
    async delete(request, response){
        const { target: id } = request.headers
        const { user_id } = request.body
        try {
            await knexConnection('transactions').where({user_id, id}).delete()
         } catch (error) {
             return response.json({error: true, message: error})
         }
         return response.json({message: 'OK'})
    }
}

module.exports = TransactionController