import Route from '@ioc:Adonis/Core/Route'

Route.get('', async ({ view }) => {
  return view.render('welcome')
})

Route.post('api/login', 'AuthController.login')
Route.post('api/register', 'AuthController.register')
Route.get('api/logout', 'AuthController.logout').middleware('auth')

Route.group(() => {
  Route.get('posts', 'PostsController.index')
  Route.post('posts', 'PostsController.store')
  // Route.get('posts/:id', 'PostsController.show')
  Route.patch('posts/:id', 'PostsController.update')
  Route.delete('posts/:id', 'PostsController.destroy')
}).middleware('auth').prefix('api')
