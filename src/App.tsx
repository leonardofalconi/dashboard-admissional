import { Router } from '~/router'

import { Header } from './components/Header'
import { NotifyProvider } from './contexts/useNotify'
import { RegistrationsProvider } from './contexts/useRegistrations'

export function App() {
  return (
    <NotifyProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <RegistrationsProvider>
        <Router />
      </RegistrationsProvider>
    </NotifyProvider>
  )
}
