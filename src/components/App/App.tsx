import { ThemeProvider } from 'styled-components'

import { Router } from '~/router'

import { NotifyProvider } from '../../contexts/useNotify'
import { RegistrationsProvider } from '../../contexts/useRegistrations'
import { Theme } from '../../theme'
import GlobalStyles from '../../theme/GlobalStyles'
import { Header } from '../Header'

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
