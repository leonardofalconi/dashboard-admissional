import { useCallback, useMemo } from 'react'

import { ROUTES } from '~/router/routes'

import { IUseDashboardStates, TUseDashboardStates } from './types'

export const useDashboardStates = (params: IUseDashboardStates): TUseDashboardStates => {
  const showRegistrations = useMemo(
    () =>
      (params.getRegistrationsCalled && !params.registrationsLoading && !params.hasRegistrationsError) ||
      params.hasRegistrations,
    [params.getRegistrationsCalled, params.hasRegistrations, params.hasRegistrationsError, params.registrationsLoading],
  )

  const showRegistrationsLoading = useMemo(
    () =>
      (params.registrationsLoading && !params.hasRegistrationsError) ||
      (params.patchRegistrationLoading && !params.hasPatchRegistrationError),
    [
      params.hasRegistrationsError,
      params.registrationsLoading,
      params.patchRegistrationLoading,
      params.hasPatchRegistrationError,
    ],
  )

  const showRegistrationsError = useMemo(
    () => params.hasRegistrationsError || params.hasPatchRegistrationError,
    [params.hasPatchRegistrationError, params.hasRegistrationsError],
  )

  const onNewAdmissionButtonClick = useCallback(
    () => params.routerProvider.push(ROUTES.newUser),
    [params.routerProvider],
  )

  return {
    showRegistrations,
    showRegistrationsLoading,
    showRegistrationsError,
    onNewAdmissionButtonClick,
  }
}
