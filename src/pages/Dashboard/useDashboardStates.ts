import { useCallback, useEffect, useMemo } from 'react'

import { ROUTES } from '~/router/routes'

import { IUseDashboardStates, TUseDashboardStates } from './types'
import { getMessageByAction } from './utils/messages'

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
      (params.patchRegistrationLoading && !params.hasPatchRegistrationError) ||
      (params.deleteRegistrationLoading && !params.hasDeleteRegistrationError),
    [
      params.registrationsLoading,
      params.hasRegistrationsError,
      params.patchRegistrationLoading,
      params.hasPatchRegistrationError,
      params.deleteRegistrationLoading,
      params.hasDeleteRegistrationError,
    ],
  )

  const showRegistrationsError = useMemo(
    () => params.hasRegistrationsError || params.hasPatchRegistrationError || params.hasDeleteRegistrationError,
    [params.hasDeleteRegistrationError, params.hasPatchRegistrationError, params.hasRegistrationsError],
  )

  const showRegistrationsSuccess = useMemo(
    () =>
      !showRegistrationsError &&
      !showRegistrationsLoading &&
      (params.patchRegistrationsCalled || params.deleteRegistrationsCalled),
    [
      params.deleteRegistrationsCalled,
      params.patchRegistrationsCalled,
      showRegistrationsError,
      showRegistrationsLoading,
    ],
  )

  const onNewAdmissionButtonClick = useCallback(
    () => params.routerProvider.push(ROUTES.newUser),
    [params.routerProvider],
  )

  const onRegistrationsRefreshButtonClick = useCallback(() => {
    params.registrationsRefresh()

    params.clearPatchCalledState()
    params.clearDeleteCalledState()
  }, [params])

  useEffect(() => {
    if (!showRegistrationsError && !showRegistrationsSuccess) return

    const title = 'Registros'
    const status = showRegistrationsError ? 'error' : 'success'

    const { message, callback } = getMessageByAction({
      type: status,
      action: {
        get: {
          hasError: params.hasRegistrationsError,
          hasSuccess: !params.hasRegistrationsError && params.getRegistrationsCalled,
          callback: () => {
            params.clearRegistrationsErrorState()
            params.clearRegistrationsCalledState()
          },
        },
        patch: {
          hasError: params.hasPatchRegistrationError,
          hasSuccess: !params.hasPatchRegistrationError && params.patchRegistrationsCalled,
          callback: () => {
            params.clearPatchErrorState()
            params.clearPatchCalledState()
          },
        },
        delete: {
          hasError: params.hasDeleteRegistrationError,
          hasSuccess: !params.hasPatchRegistrationError && params.deleteRegistrationsCalled,
          callback: () => {
            params.clearDeleteErrorState()
            params.clearDeleteCalledState()
          },
        },
      },
    })

    params.notifyProvider.setNotify({ title, status, message })

    if (!callback) return

    callback()
  }, [params, showRegistrationsError, showRegistrationsSuccess])

  return {
    showRegistrations,
    showRegistrationsLoading,
    showRegistrationsError,
    onNewAdmissionButtonClick,
    onRegistrationsRefreshButtonClick,
  }
}
