import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 191)
      table.string('last_name', 191)
      table.string('username', 191).unique()
      table.string('email', 191).unique()
      table.string('password', 191)
      table.string('avatar', 191).defaultTo('default_avatar.png')
      table.enum('gender', ['male', 'female', 'other'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
