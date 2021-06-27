exports.up = (knex) => (
  knex.schema.createTable('interviews', t => {
    t.increments('id').primary()
    t.string('status').notNullable()
    t.string('profession')
    t.string('position')
    t.string('description')
    t.string('video_link')
    t.timestamp('planned_at')

    t.integer('interviewee_id')
    t.integer('interviewer_id')

    t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()

    t.foreign('interviewee_id').references('id').inTable('users')
    t.foreign('interviewer_id').references('id').inTable('users')
  })
)

exports.down = (knex) => (
  knex.schema.dropTable('interviews')
)
