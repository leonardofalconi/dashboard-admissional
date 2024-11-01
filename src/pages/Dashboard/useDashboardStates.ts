import { useCallback, useMemo } from 'react'

import { ROUTES } from '~/router/routes'

import { IUseDashboardStates, TUseDashboardStates } from './types'

export const useDashboardStates = ({
  getRegistrationsCalled,
  registrationsLoading,
  hasRegistrations,
  hasRegistrationsError,
  routerProvider,
}: IUseDashboardStates): TUseDashboardStates => {
  const showRegistrations = useMemo(
    () => (getRegistrationsCalled && !registrationsLoading && !hasRegistrationsError) || hasRegistrations,
    [getRegistrationsCalled, hasRegistrations, hasRegistrationsError, registrationsLoading],
  )

  const showRegistrationsLoading = useMemo(
    () => registrationsLoading && !hasRegistrationsError,
    [hasRegistrationsError, registrationsLoading],
  )

  const showRegistrationsError = useMemo(() => Boolean(hasRegistrationsError), [hasRegistrationsError])

  const onNewAdmissionButtonClick = useCallback(() => routerProvider.push(ROUTES.newUser), [routerProvider])

  return {
    showRegistrations,
    showRegistrationsLoading,
    showRegistrationsError,
    onNewAdmissionButtonClick,
  }
}
