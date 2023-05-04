exports.up = knex => knex.schema.createTable("transactions", table => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE") 
    table.text('title')
    table.text('type')
    table.text('category')
    table.integer('amount')
    table.timestamp('createdAt').default(knex.fn.now()) 
})

exports.down = knex => knex.schema.dropTable("transactions")
