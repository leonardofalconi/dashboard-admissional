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

  const getRegistrationsStates = useGetRegistrations({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationsContext.setRegistrations,
    hasRegistrationsCached: Boolean(registrationsContext.registrations.length),
  })

  const patchRegistrationStates = usePatchRegistration({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationsContext.setRegistrations,
  })

  const deleteRegistrationStates = useDeleteRegistration({
    registrationsProvider: API.REGISTRATION,
    setRegistrations: registrationsContext.setRegistrations,
  })

  const dashboardStates = useDashboardStates({
    getRegistrationsCalled: getRegistrationsStates.getRegistrationsCalled,
    patchRegistrationsCalled: patchRegistrationStates.patchRegistrationCalled,
    deleteRegistrationsCalled: deleteRegistrationStates.deleteRegistrationCalled,
    hasRegistrations: Boolean(registrationsContext.registrations.length),
    hasRegistrationsError: Boolean(getRegistrationsStates.registrationsError),
    hasPatchRegistrationError: Boolean(patchRegistrationStates.patchRegistrationError),
    hasDeleteRegistrationError: Boolean(deleteRegistrationStates.deleteRegistrationError),
    registrationsLoading: getRegistrationsStates.registrationsLoading,
    patchRegistrationLoading: patchRegistrationStates.patchRegistrationLoading,
    deleteRegistrationLoading: deleteRegistrationStates.deleteRegistrationLoading,
    routerProvider: history,
    notifyProvider: notifyContext,
    registrationsRefresh: getRegistrationsStates.registrationsRefresh,
    clearRegistrationsErrorState: getRegistrationsStates.clearErrorState,
    clearPatchErrorState: patchRegistrationStates.clearErrorState,
    clearDeleteErrorState: deleteRegistrationStates.clearErrorState,
    clearRegistrationsCalledState: getRegistrationsStates.clearCalledState,
    clearPatchCalledState: patchRegistrationStates.clearCalledState,
    clearDeleteCalledState: deleteRegistrationStates.clearCalledState,
  })

  return (
    <Styled.Container>
      <SearchBar
        onRefreshButtonClick={dashboardStates.onRegistrationsRefreshButtonClick}
        onNewAdmissionButtonClick={dashboardStates.onNewAdmissionButtonClick}
        disabled={dashboardStates.showRegistrationsLoading}
      />
      <>
        {dashboardStates.showRegistrations && (
          <Collumns
            actions={params =>
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
        )}

        {dashboardStates.showRegistrationsLoading && <Loading />}
      </>
    </Styled.Container>
  )
}
