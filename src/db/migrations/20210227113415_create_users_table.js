exports.up = (knex) => (
  knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('role')
    t.string('firstname')
    t.string('lastname')
    t.string('email')
    t.string('password')
    t.string('github_uid')
    t.boolean('enabled').defaultTo(false).notNullable()
    t.boolean('verified').defaultTo(false).notNullable()
    t.boolean('archived').defaultTo(false).notNullable()
    t.uuid('confirmation_token')

    t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()

    t.unique('email')
    t.unique('github_uid')
  })
)

exports.down = (knex) => (
  knex.schema.dropTable('users')
)
