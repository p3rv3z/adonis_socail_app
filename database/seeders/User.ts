import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'john@gmail.com',
      gender: 'male',
      password: 'password',
    })
  }
}
