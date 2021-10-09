import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

  public async register({ request, response }: HttpContextContract) {

    const userSchema = schema.create({
      first_name: schema.string({}, [
        rules.minLength(2),
        rules.maxLength(26)
      ]),
      last_name: schema.string({}, [
        rules.minLength(2),
        rules.maxLength(26)
      ]),
      username: schema.string({}, [
        rules.minLength(2),
        rules.maxLength(191),
        rules.unique({ table: 'users', column: 'username' })
      ]),
      email: schema.string({}, [
        rules.email(),
        rules.maxLength(191),
        rules.unique({ table: 'users', column: 'email' })
      ]),
      avatar: schema.string.optional({}, [
        rules.minLength(1),
        rules.maxLength(191),
      ]),
      gender: schema.enum(
        ['male', 'female', 'other'] as const
      ),
      password: schema.string({}, [
        rules.minLength(8),
        rules.maxLength(191),
        rules.confirmed()
      ]),
    })

    const payload = await request.validate({
      schema: userSchema
    })

    await User.create(payload)
    return response.status(201)
  }

  public async login({ auth, request }: HttpContextContract) {

    const email = request.input('email')
    const password = request.input('password')

    await auth.use('web').attempt(email, password)
    return auth.user
  }

  public async logout({ auth }: HttpContextContract) {
    return auth.use('web').logout()
  }
}
