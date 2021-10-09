import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 26)
      table.string('last_name', 26)
      table.string('username', 191).unique()
      table.string('email', 191).unique()
      table.string('avatar', 191).defaultTo('default_avatar.png').nullable()
      table.enum('gender', ['male', 'female', 'other'])
      table.string('password', 191)
      table.string('remember_me_token').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
