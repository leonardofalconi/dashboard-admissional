import { Router } from '~/router'

import { Header } from './components/Header'
import { RegistrationsProvider } from './contexts/useRegistrations'

export function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <RegistrationsProvider>
        <Router />
      </RegistrationsProvider>
    </>
  )
}
