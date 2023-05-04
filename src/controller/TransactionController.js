const knexConnection = require('../database')

class TransactionController{
    async index(request, response){
        const { id } = request.body
        const transactions = await knexConnection('transactions').where('user_id', id)
        console.log(transactions);
        return response.json(transactions)
    }
    async create(request, response){
        const {title, type, amount, category, id} = request.body
        await knexConnection('transactions').insert({ user_id: id, title, type, amount, category})
        return response.json({message: 'OK'})
    }
    async update(request, response){

    }
}

module.exports = TransactionController