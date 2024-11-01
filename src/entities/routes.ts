export type TRoute = '/dashboard' | '/new-user'

export type TRouteKey = 'dashboard' | 'newUser'

export type IRoutes = {
  [key in TRouteKey]: TRoute
}
