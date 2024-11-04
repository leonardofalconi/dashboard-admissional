import { useCallback, useEffect, useMemo } from 'react'

import { ROUTES } from '~/router/routes'
import { formMask } from '~/utils/form'

import { IUseDashboardStates, TOnInputSearchChangeParams, TUseDashboardStates } from './types'
import { getMessageByAction } from './utils/messages'

export const useDashboardStates = (params: IUseDashboardStates): TUseDashboardStates => {
  const showRegistrationsLoading = useMemo(
    () =>
      (params.getRegistrationsStates.registrationsLoading && !params.getRegistrationsStates.registrationsError) ||
      (params.patchRegistrationStates.patchRegistrationLoading &&
        !params.patchRegistrationStates.patchRegistrationError) ||
      (params.deleteRegistrationStates.deleteRegistrationLoading &&
        !params.deleteRegistrationStates.deleteRegistrationError),
    [
      params.deleteRegistrationStates.deleteRegistrationError,
      params.deleteRegistrationStates.deleteRegistrationLoading,
      params.getRegistrationsStates.registrationsError,
      params.getRegistrationsStates.registrationsLoading,
      params.patchRegistrationStates.patchRegistrationError,
      params.patchRegistrationStates.patchRegistrationLoading,
    ],
  )

  const showRegistrationsError = useMemo(
    () =>
      !!params.getRegistrationsStates.registrationsError ||
      !!params.patchRegistrationStates.patchRegistrationError ||
      !!params.deleteRegistrationStates.deleteRegistrationError,
    [
      params.deleteRegistrationStates.deleteRegistrationError,
      params.getRegistrationsStates.registrationsError,
      params.patchRegistrationStates.patchRegistrationError,
    ],
  )

  const showRegistrationsSuccess = useMemo(
    () =>
      !showRegistrationsError &&
      !showRegistrationsLoading &&
      (params.patchRegistrationStates.patchRegistrationCalled ||
        params.deleteRegistrationStates.deleteRegistrationCalled),
    [
      params.deleteRegistrationStates.deleteRegistrationCalled,
      params.patchRegistrationStates.patchRegistrationCalled,
      showRegistrationsError,
      showRegistrationsLoading,
    ],
  )

  const onNewAdmissionButtonClick = useCallback(
    () => {
      if (params.getRegistrationsStates.registrationsFiltering) {
        params.getRegistrationsStates.resetRegistrations()
      }

      params.routerProvider.push(ROUTES.newUser)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.getRegistrationsStates.registrationsFiltering],
  )

  const onRegistrationsRefreshButtonClick = useCallback(() => {
    const inputSearchElement = document.querySelector('input#search') as HTMLInputElement

    inputSearchElement.value = ''

    params.getRegistrationsStates.registrationsRefresh()

    params.patchRegistrationStates.clearCalledState()
    params.deleteRegistrationStates.clearCalledState
    params.getRegistrationsStates.clearFilteringState()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onHookInit = useCallback(() => {
    if (params.hasRegistrations || params.getRegistrationsStates.registrationsFiltering) return

    params.getRegistrationsStates.getRegistrationsFromApi()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.hasRegistrations, params.getRegistrationsStates.registrationsFiltering])

  const onInputSearchChange = (e: TOnInputSearchChangeParams) => {
    e.currentTarget.value = formMask.cpf({ value: e.currentTarget.value })

    if (e.currentTarget.value.length < 14) return

    e.currentTarget.blur()

    params.getRegistrationsStates.getRegistrationsFilteredFromApi({ filters: { cpf: e.currentTarget.value } })
  }

  const dispatchNotification = useCallback(() => {
    if (!showRegistrationsError && !showRegistrationsSuccess) return

    const title = 'Registros'
    const status = showRegistrationsError ? 'error' : 'success'

    const { message, callback } = getMessageByAction({
      type: status,
      action: {
        get: {
          hasError: !!params.getRegistrationsStates.registrationsError,
          hasSuccess:
            !params.getRegistrationsStates.registrationsError && params.getRegistrationsStates.getRegistrationsCalled,
          callback: () => {
            params.getRegistrationsStates.clearErrorState()
            params.getRegistrationsStates.clearCalledState
          },
        },
        patch: {
          hasError: !!params.patchRegistrationStates.patchRegistrationError,
          hasSuccess:
            !params.patchRegistrationStates.patchRegistrationError &&
            params.patchRegistrationStates.patchRegistrationCalled,
          callback: () => {
            params.patchRegistrationStates.clearErrorState()
            params.patchRegistrationStates.clearCalledState()
          },
        },
        delete: {
          hasError: !!params.deleteRegistrationStates.deleteRegistrationError,
          hasSuccess:
            !params.deleteRegistrationStates.deleteRegistrationError &&
            params.deleteRegistrationStates.deleteRegistrationCalled,
          callback: () => {
            params.deleteRegistrationStates.clearErrorState()
            params.deleteRegistrationStates.clearCalledState()
          },
        },
      },
    })

    params.notifyProvider.setNotify({ title, status, message })

    if (!callback) return

    callback()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.getRegistrationsStates.registrationsError,
    params.getRegistrationsStates.getRegistrationsCalled,
    params.patchRegistrationStates.patchRegistrationError,
    params.patchRegistrationStates.patchRegistrationCalled,
    params.deleteRegistrationStates.deleteRegistrationError,
    params.deleteRegistrationStates.deleteRegistrationCalled,
    showRegistrationsError,
    showRegistrationsSuccess,
  ])

  useEffect(dispatchNotification, [dispatchNotification])

  useEffect(onHookInit, [onHookInit])

  return {
    showRegistrationsLoading,
    showRegistrationsError,
    onNewAdmissionButtonClick,
    onRegistrationsRefreshButtonClick,
    onInputSearchChange,
  }
}
