import { useHistory } from 'react-router-dom'

import { API } from '~/api'
import { useRegistrationsContext } from '~/contexts/useRegistrations'
import { usePatchRegistration } from '~/hooks/registrations/usePatchRegistration'

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

  const patchRegistrationStates = usePatchRegistration({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationsContext.setRegistrations,
  })

  const dashboardStates = useDashboardStates({
    getRegistrationsCalled: getRegistrationsStates.getRegistrationsCalled,
    hasRegistrations: Boolean(registrationsContext.registrations.length),
    hasRegistrationsError: Boolean(getRegistrationsStates.registrationsError),
    hasPatchRegistrationError: Boolean(patchRegistrationStates.patchRegistrationError),
    registrationsLoading: getRegistrationsStates.registrationsLoading,
    patchRegistrationLoading: patchRegistrationStates.patchRegistrationLoading,
    routerProvider: history,
  })

  return (
    <Styled.Container>
      <SearchBar
        onRefreshButtonClick={getRegistrationsStates.registrationsRefresh}
        onNewAdmissionButtonClick={dashboardStates.onNewAdmissionButtonClick}
      />
      <>
        {dashboardStates.showRegistrations && (
          <Collumns
            actions={params =>
              params.actionType === 'DELETE'
                ? console.log('DELETE')
                : patchRegistrationStates.updateRegistrationFromApi({
                    id: params.contact.id,
                    values: { status: params.actionType },
                  })
            }
            registrations={registrationsContext.registrations}
          />
        )}

        {dashboardStates.showRegistrationsError && <p>Error</p>}

        {dashboardStates.showRegistrationsLoading && <p>Loading</p>}
      </>
    </Styled.Container>
  )
}
