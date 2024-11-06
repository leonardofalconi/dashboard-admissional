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

    params.notifyProvider.setNotify({
      title: 'Cadastro',
      message: 'Contato cadastrado com sucesso.',
      status: 'success',
    })

    params.postClearCalledState()

    goToHome()
  }, [goToHome, onFormSubmitSuccess, params, params.notifyProvider])

  useEffect(() => {
    if (!showPostRegistrationError) return

    params.notifyProvider.setNotify({
      title: 'Cadastro',
      message: 'Não foi possível cadastrar o novo contato.',
      status: 'error',
    })

    params.postClearCalledState()
    params.postClearErrorState()
  }, [params, params.notifyProvider, showPostRegistrationError])

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
