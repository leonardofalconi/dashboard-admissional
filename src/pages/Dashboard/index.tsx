import { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { API } from '~/api'
import { useRegistrationsContext } from '~/contexts/useRegistrations'
import { ROUTES } from '~/router/routes'

import * as Styled from './styles'
import { useGetRegistrations } from '../../hooks/registrations/useGetRegistrations'
import { Collumns } from './components/Columns'
import { SearchBar } from './components/Searchbar'

export const DashboardPage = () => {
  const history = useHistory()

  const { registrations, setRegistrations } = useRegistrationsContext()

  const { registrationsLoading, registrationsError, getRegistrationsCalled, registrationsRefresh } =
    useGetRegistrations({
      registrationsProvider: API.REGISTRATION,
      setRegistrations,
      hasRegistrationsCached: Boolean(registrations.length),
    })

  const showRegistrations = useMemo(
    () => (getRegistrationsCalled && !registrationsLoading && !registrationsError) || registrations,
    [getRegistrationsCalled, registrations, registrationsError, registrationsLoading],
  )

  const showRegistrationsLoading = useMemo(
    () => registrationsLoading && !registrations.length,
    [registrations, registrationsLoading],
  )

  const showRegistrationsError = useMemo(() => registrationsError, [registrationsError])

  const onNewAdmissionButtonClick = useCallback(() => history.push(ROUTES.newUser), [history])

  return (
    <Styled.Container>
      <SearchBar onRefreshButtonClick={registrationsRefresh} onNewAdmissionButtonClick={onNewAdmissionButtonClick} />
      <>
        {showRegistrations && <Collumns registrations={registrations} />}

        {showRegistrationsError && <p>Error</p>}

        {showRegistrationsLoading && <p>Loading</p>}
      </>
    </Styled.Container>
  )
}
