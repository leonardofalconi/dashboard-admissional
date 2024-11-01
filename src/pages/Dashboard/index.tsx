import { useHistory } from 'react-router-dom'

import { API } from '~/api'
import { useRegistrationsContext } from '~/contexts/useRegistrations'

import * as Styled from './styles'
import { useGetRegistrations } from '../../hooks/registrations/useGetRegistrations'
import { Collumns } from './components/Columns'
import { SearchBar } from './components/Searchbar'
import { useDashboardStates } from './useDashboardStates'

export const DashboardPage = () => {
  const history = useHistory()

  const registrationsContext = useRegistrationsContext()

  const getRegistrationsStates = useGetRegistrations({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationsContext.setRegistrations,
    hasRegistrationsCached: Boolean(registrationsContext.registrations.length),
  })

  const dashboardStates = useDashboardStates({
    getRegistrationsCalled: getRegistrationsStates.getRegistrationsCalled,
    hasRegistrations: Boolean(registrationsContext.registrations.length),
    hasRegistrationsError: Boolean(getRegistrationsStates.registrationsError),
    registrationsLoading: getRegistrationsStates.registrationsLoading,
    routerProvider: history,
  })

  return (
    <Styled.Container>
      <SearchBar
        onRefreshButtonClick={getRegistrationsStates.registrationsRefresh}
        onNewAdmissionButtonClick={dashboardStates.onNewAdmissionButtonClick}
      />
      <>
        {dashboardStates.showRegistrations && <Collumns registrations={registrationsContext.registrations} />}

        {dashboardStates.showRegistrationsError && <p>Error</p>}

        {dashboardStates.showRegistrationsLoading && <p>Loading</p>}
      </>
    </Styled.Container>
  )
}
