import { useMemo } from 'react'

import { API } from '~/api'
import { useRegistrationsContext } from '~/contexts/useRegistrations'

import * as Styled from './styles'
import { useGetRegistrations } from '../../hooks/registrations/useGetRegistrations'
import { Collumns } from './components/Columns'
import { SearchBar } from './components/Searchbar'

export const DashboardPage = () => {
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
    () => registrationsLoading && !registrations,
    [registrations, registrationsLoading],
  )

  const showRegistrationsError = useMemo(() => registrationsError, [registrationsError])

  return (
    <Styled.Container>
      <SearchBar onRefreshButtonClick={registrationsRefresh} />
      <>
        {showRegistrations && <Collumns registrations={registrations} />}

        {showRegistrationsError && <p>Error</p>}

        {showRegistrationsLoading && <p>Loading</p>}
      </>
    </Styled.Container>
  )
}
