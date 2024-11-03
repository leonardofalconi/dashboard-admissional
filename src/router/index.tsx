import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import { DashboardPage } from '~/pages/Dashboard'
import { NewUserPage } from '~/pages/NewUser'

import { ROUTES } from './routes'

export const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={ROUTES.dashboard} component={DashboardPage} />
        <Route exact path={ROUTES.newUser} component={NewUserPage} />

        <Route exact path="*">
          <Redirect to={ROUTES.dashboard} />
        </Route>
      </Switch>
    </HashRouter>
  )
}
