import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { ROUTES } from '~/router/routes'

import {
  IUseNewUserStatesFormData,
  TUseNewUserStates,
  TUseNewUserStatesHandleSubmitParams,
  TUseNewUserStatesReturn,
} from './types'

export const useNewUserStates = (params: TUseNewUserStates): TUseNewUserStatesReturn => {
  const { register, handleSubmit, formState: states, setValue } = useForm<IUseNewUserStatesFormData>()

  const showPostRegistrationLoading = useMemo(
    () => params.postRegistrationLoading && !params.hasPostRegistrationError,
    [params.postRegistrationLoading, params.hasPostRegistrationError],
  )

  const showPostRegistrationError = useMemo(() => params.hasPostRegistrationError, [params.hasPostRegistrationError])

  const onFormSubmitSuccess = useMemo(
    () => !showPostRegistrationLoading && !showPostRegistrationError && params.postRegistrationCalled,
    [params.postRegistrationCalled, showPostRegistrationError, showPostRegistrationLoading],
  )

  const goToHome = useCallback(() => params.routerProvider.push(ROUTES.dashboard), [params.routerProvider])

  const onSubmit = handleSubmit((contact: TUseNewUserStatesHandleSubmitParams) => {
    params.formSubmitCallback({ contact: { ...contact, status: 'REVIEW' } })
  })

  useEffect(() => {
    if (!onFormSubmitSuccess) return

    goToHome()
  }, [goToHome, onFormSubmitSuccess])

  return {
    form: {
      onSubmit,
      register,
      states,
      setValue,
    },
    onPrevButtonClick: goToHome,
    showPostRegistrationLoading,
    showPostRegistrationError,
  }
}
