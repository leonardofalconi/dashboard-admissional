import { ThemeProvider } from 'styled-components'

import { Header } from '~/components/Header'
import { NotifyProvider } from '~/contexts/useNotify'
import { RegistrationsProvider } from '~/contexts/useRegistrations'
import { Router } from '~/router'
import { Theme } from '~/theme'
import GlobalStyles from '~/theme/GlobalStyles'

export const App = () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
    <NotifyProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <RegistrationsProvider>
        <Router />
      </RegistrationsProvider>
    </NotifyProvider>
  </ThemeProvider>
)
