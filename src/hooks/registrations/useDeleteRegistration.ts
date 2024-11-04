import { useCallback, useState } from 'react'

import { IUseDeleteRegistrationParams, TUseDeleteRegistrationRemoveParams, TUseDeleteRegistrationReturn } from './types'

export const useDeleteRegistration = ({
  registrationsProvider,
  setRegistrations,
}: IUseDeleteRegistrationParams): TUseDeleteRegistrationReturn => {
  const [error, setError] = useState<TUseDeleteRegistrationReturn['deleteRegistrationError']>()
  const [loading, setLoading] = useState<TUseDeleteRegistrationReturn['deleteRegistrationLoading']>(false)
  const [called, setCalled] = useState<TUseDeleteRegistrationReturn['deleteRegistrationCalled']>(false)

  const removeRegistrationFromApi = useCallback(
    async ({ id }: TUseDeleteRegistrationRemoveParams) => {
      setLoading(true)
      setCalled(true)
      setError(undefined)

      try {
        await registrationsProvider.DELETE({ id })

        setRegistrations(current => current.filter(registration => registration.id !== id))
      } catch (e) {
        const error = e as Error

        console.error(error)

        setError(error)
      } finally {
        setLoading(false)
      }
    },
    [registrationsProvider, setRegistrations],
  )

  const clearErrorState = useCallback(() => setError(undefined), [])

  const clearCalledState = useCallback(() => setCalled(false), [])

  return {
    deleteRegistrationError: error,
    deleteRegistrationLoading: loading,
    deleteRegistrationCalled: called,
    removeRegistrationFromApi,
    clearErrorState,
    clearCalledState,
  }
}
