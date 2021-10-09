import Route from '@ioc:Adonis/Core/Route'

Route.get('', async ({ view }) => {
  return view.render('welcome')
})

Route.post('api/login', 'AuthController.login')
Route.post('api/register', 'AuthController.register')
Route.get('api/logout', 'AuthController.logout')

Route.get('api/dashboard', async ({ auth }) => {
  await auth.use('web').authenticate()
  return auth.user
})
