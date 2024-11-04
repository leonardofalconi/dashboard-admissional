import { useCallback, useState } from 'react'

import { IUsePatchRegistrationParams, TUsePatchRegistrationReturn, TUsePatchRegistrationUpdateParams } from './types'

export const usePatchRegistration = ({
  registrationsProvider,
  setRegistrations,
}: IUsePatchRegistrationParams): TUsePatchRegistrationReturn => {
  const [error, setError] = useState<TUsePatchRegistrationReturn['patchRegistrationError']>()
  const [loading, setLoading] = useState<TUsePatchRegistrationReturn['patchRegistrationLoading']>(false)
  const [called, setCalled] = useState<TUsePatchRegistrationReturn['patchRegistrationCalled']>(false)

  const updateRegistrationFromApi = useCallback(
    async ({ id, values }: TUsePatchRegistrationUpdateParams) => {
      setLoading(true)
      setCalled(true)
      setError(undefined)

      try {
        await registrationsProvider.PATCH({ id, values })

        setRegistrations(current =>
          current.map(registration => (registration.id === id ? { ...registration, ...values } : registration)),
        )
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
    patchRegistrationError: error,
    patchRegistrationLoading: loading,
    patchRegistrationCalled: called,
    updateRegistrationFromApi,
    clearErrorState,
    clearCalledState,
  }
}
