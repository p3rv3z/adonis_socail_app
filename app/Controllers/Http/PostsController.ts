import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Post from "App/Models/Post"

export default class PostsController {
  public async index() {
    return Post.query().preload('user').orderBy('id')
  }

  public async store({ request, response, auth }: HttpContextContract) {

    const postSchema = schema.create({
      text: schema.string({}, [
        rules.maxLength(1000),
      ]),
    })

    const payload = await request.validate({ schema: postSchema })
    const user = await auth.use('web').user
    const post = await user?.related('posts').create(payload)

    return response.status(201).send(post)
  }

  public async update({ params, request, auth }: HttpContextContract) {
    const postSchema = schema.create({
      text: schema.string({}, [
        rules.maxLength(1000),
      ]),
    })

    const payload = await request.validate({ schema: postSchema })
    const user = await auth.use('web').user
    const post = await user?.related('posts').query().where('id', params.id).firstOrFail()

    return post?.merge(payload).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return post
  }
}
