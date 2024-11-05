import { useHistory } from 'react-router-dom'

import { API } from '~/api'
import { Loading } from '~/components/Loading'
import { useNotifyContext } from '~/contexts/useNotify'
import { useRegistrationsContext } from '~/contexts/useRegistrations'
import { useDeleteRegistration } from '~/hooks/registrations/useDeleteRegistration'
import { usePatchRegistration } from '~/hooks/registrations/usePatchRegistration'

import * as Styled from './styles'
import { useGetRegistrations } from '../../hooks/registrations/useGetRegistrations'
import { Collumns } from './components/Columns'
import { SearchBar } from './components/Searchbar'
import { useDashboardStates } from './useDashboardStates'

export const DashboardPage = () => {
  const history = useHistory()
  const notifyContext = useNotifyContext()
  const registrationsContext = useRegistrationsContext()

  const registrationsStatesParams = {
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationsContext.setRegistrations,
  }

  const getRegistrationsStates = useGetRegistrations(registrationsStatesParams)
  const patchRegistrationStates = usePatchRegistration(registrationsStatesParams)
  const deleteRegistrationStates = useDeleteRegistration(registrationsStatesParams)

  const dashboardStates = useDashboardStates({
    routerProvider: history,
    notifyProvider: notifyContext,
    getRegistrationsStates,
    patchRegistrationStates,
    deleteRegistrationStates,
    hasRegistrations: !!registrationsContext.registrations.length,
  })

  return (
    <Styled.Container data-testid="test-dashboard-page">
      <SearchBar
        onRefreshButtonClick={dashboardStates.onRegistrationsRefreshButtonClick}
        onNewAdmissionButtonClick={dashboardStates.onNewAdmissionButtonClick}
        search={{ onChange: dashboardStates.onInputSearchChange }}
        disabled={dashboardStates.showRegistrationsLoading}
      />
      <>
        <Collumns
          action={params =>
            params.actionType === 'DELETE'
              ? deleteRegistrationStates.removeRegistrationFromApi({ id: params.contact.id })
              : patchRegistrationStates.updateRegistrationFromApi({
                  id: params.contact.id,
                  values: { status: params.actionType },
                })
          }
          registrations={registrationsContext.registrations}
          disabled={dashboardStates.showRegistrationsLoading}
        />

        {dashboardStates.showRegistrationsLoading && <Loading />}
      </>
    </Styled.Container>
  )
}
